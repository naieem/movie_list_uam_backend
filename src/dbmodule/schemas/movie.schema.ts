import * as mongoose from 'mongoose';

export const MovieSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Year: {
    type: String,
    required: true,
  },
  imdbID: {
    type: String,
    required: true,
  },
  Poster: {
    type: String,
  },
  Type: {
    type: String,
    required: true,
  },
});
