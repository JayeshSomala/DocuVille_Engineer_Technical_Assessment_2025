const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const natural = require("natural");
const Diff = require("diff");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


function tokenizeAndClean(text) {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text.toLowerCase());
  return tokens;
}

function jaccardSimilarity(tokensA, tokensB) {
  const setA = new Set(tokensA);
  const setB = new Set(tokensB);

  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);

  if (union.size === 0) return 1; // edge case: both empty
  return intersection.size / union.size;
}

app.post("/compare", (req, res) => {
  const { text1, text2 } = req.body;

  if (!text1 || !text2) {
    return res.status(400).json({ error: "Both text1 and text2 are required." });
  }

  const tokens1 = tokenizeAndClean(text1);
  const tokens2 = tokenizeAndClean(text2);

  const score = jaccardSimilarity(tokens1, tokens2);


  const diff = Diff.diffWords(text1, text2);

  res.json({
    similarityScore: score.toFixed(2),
    differences: diff
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
