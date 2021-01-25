const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    projectID: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        // default: Date.now
    },
    stats: {
        googleAds: {
            clicks: {
                type: Number,
            },
            views: {
                 type: Number,
            },
        },
        googleSearch: {
            totalClicks: {
                type: Number,
            },
            totalViews: {
                type: Number,
            },
        },
        googleAnalytics: {
            clients: {
                type: Number,
            },
            newClients: {
                type: Number,
            },
            sessions: {
                type: Number,
            },	
            bounceRate: {
                type: Number,
            },
            views: {
                type: Number,
            }
        }
    }
}, {
    timestamps: true,
})

const Report = mongoose.model('reports', reportSchema);

module.exports = Report;