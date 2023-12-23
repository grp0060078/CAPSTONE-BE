//controllers/queryController.js

const Query = require('../models/Query');

// Create a new query
exports.createQuery = async (req, res) => {
  try {
    const {
      student,
      category,
      voiceCommunicationLanguage,
      queryTitle,
      queryDescription,
      availableTime,
    } = req.body;

    // Validate that all required fields are present
    if (!student || !category || !voiceCommunicationLanguage || !queryTitle || !queryDescription || !availableTime) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newQuery = new Query({
      student,
      category,
      voiceCommunicationLanguage,
      queryTitle,
      queryDescription,
      availableTime,
    });

    // Save the new query to the database
    await newQuery.save();

    // Respond with the created query
    res.status(201).json(newQuery);
  } catch (error) {
    // Handle validation errors or other issues
    res.status(500).json({ error: error.message });
  }
};

// Get a list of all queries
exports.getQueries = async (req, res) => {
  try {
    const queries = await Query.find();
    res.json(queries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Solve a query
exports.solveQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const { solution } = req.body;

    // Validate that the solution is provided
    if (!solution) {
      return res.status(400).json({ error: 'Solution is required' });
    }

    const query = await Query.findById(id);

    if (!query) {
      return res.status(404).json({ error: 'Query not found' });
    }

    if (query.solution) {
      return res.status(400).json({ error: 'Query is already solved' });
    }

    query.solution = solution;
    await query.save();

    res.json(query);
  } catch (error) {
    // Handle validation errors or other issues
    res.status(500).json({ error: error.message });
  }
};
