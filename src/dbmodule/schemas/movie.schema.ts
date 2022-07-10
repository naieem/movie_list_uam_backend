import * as mongoose from 'mongoose';

export const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  imdbId: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
});
