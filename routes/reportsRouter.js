const router = require('express').Router();
const Report = require('../models/reportModel');

router.post("/", async (req, res) => {
    try {
        const { projectID, stats } = req.body

        const newReport = new Report({
            projectID,
            stats,
        });

        const saveReport = await newReport.save();
        res.json(saveReport)

    } catch(err) {
        res.status(500).json({error: err.message});
    }
})

router.get("/:id", async (req, res) => {
    // req.params.id
    try {
        const projectReports = await Report.find({projectID: req.params.id})
        res.json(projectReports)
    } catch(err) {
        res.status(500).json({error: err.message});
    }
})

router.get("/:id/:date", async (req, res) => {
    console.log(req.params.date);
    try {
        res.json('ok!')
     
    } catch(err) {
        res.status(500).json({error: err.message});
    }

    // try {
    //     const projectReports = await Report.find({projectID: req.params.id})
    //     res.json(projectReports)
    // } catch(err) {
    //     res.status(500).json({error: err.message});
    // }
})



// router.get('/', async (req, res) => {
//     try {
//         const report = await Report.aggregate([
//             {
//                 $match: {
//                       'project.id': {$projectidl}
//                     }
//                   },
//                   {
//                     /* group by year and month */
//                     $group: {
//                       _id: {
//                         year: {
//                           $year: '$raport.date'
//                         },
//                         month: {
//                           $month: '$raport.date'
//                         }
//                       },
//                     }
//                   },
//                   {
//                     /* sort descending (latest subscriptions first) */
//                     $sort: {
//                       '_id.year': -1,
//                       '_id.month': -1
//                     }
//                   },
//                   {
//                     $limit: 100,
//                   },
//         ])
//         res.json(report)
//     } catch {
//         res.status(500).json({error: err.message})
//     }
// })


module.exports = router