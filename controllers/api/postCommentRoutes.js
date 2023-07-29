const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// creates a new comment with in post
