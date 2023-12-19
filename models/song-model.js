const mongoose = require('mongoose');

const { Schema } = mongoose;

const songSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
        },

        trackName: {
            type: String,
            required: true,
        },

        prevLink: {
            type: String,
            required: true,
        },
        artN: {
            type: String,
            required: true,
        },

        img: {
            type: String,
            required: true,
        },

        artId: {
            type: String,
            required: true,
        },

        release_date: {
            type: String,
            required: true,
        },

        dur: {
            type: String,
            required: true,
        },
        trackId: {
            type: String,
            required: true,
        },

        index: {
            type: Number,
            required: true,
        },
    },
);

module.exports = mongoose.models.SongsCollection || mongoose.model("SongsCollection", songSchema);