import { Request, Response } from 'express';
import { FormModel } from '../models/Form';
import { UserApplication } from '../models/UserApplication';
import { updateQuestions } from '../forms/forms';
import { User } from '../types';

//This is the route used when updating the MongoDB with the airtable
export const updateRoute = async (_: Request, res: Response) => {
  const form = await updateQuestions();
  if (await FormModel.exists({ name: 'Student' })) {
    await FormModel.deleteOne({ name: 'Student' });
  }
  await FormModel.create(form);
  return res.json(form);
};

//getQuestions queries the MongoDB and returns the ENTIRE form
export const getQuestions = async (_: Request, res: Response) => {
  return res.json(await FormModel.findOne({ name: 'Student' }));
};

//getPage returns all sections in a certain page
export const getPage = async (req: Request, res: Response) => {
  const pageNumber = req.params['page'];
  try {
    const form = await FormModel.findOne({ name: 'Student' });
    return res.json(form['pages'].get(pageNumber));
  } catch (e) {
    console.log(e);
  }
  return res.send('error');
};

export const getAnswers = async (req: Request, res: Response) => {
  const user = req.user as User;
  console.log(user);
  const q = await UserApplication.findOne({ user: user._id });
  let answers = {};
  if (q) {
    const submissions = q.studentSubmissions;
    answers = submissions.answers.toObject({ flattenMaps: true });
  }
  return res.json(answers);
};

// data :>>  [[{"qid": "answer"}, {"qid": "answer"}], []]
/*
sections :>>  [
  [
    {
      '602c38e54a74a01bbc34789e': 'bager',
      '602c38e54a74a01bbc34789f': 'bare',
      '602c38e54a74a01bbc3478a0': 'bare',
      '602c38e54a74a01bbc3478a1': '32',
      '602c38e54a74a01bbc3478a2': '2'
    },
    {
      '602c38e54a74a01bbc34789e': 'basd',
      '602c38e54a74a01bbc34789f': 'ds',
      '602c38e54a74a01bbc3478a0': 'sdd',
      '602c38e54a74a01bbc3478a1': '3',
      '602c38e54a74a01bbc3478a2': 'dfs'
    }
  ],
  [
    {
      '602c38e54a74a01bbc3478a4': '',
      '602c38e54a74a01bbc3478a5': '',
      '602c38e54a74a01bbc3478a6': '',
      '602c38e54a74a01bbc3478a7': '',
      '602c38e54a74a01bbc3478a8': ''
    }
  ],
  [
    {
      '602c38e54a74a01bbc3478aa': 'ccc',
      '602c38e54a74a01bbc3478ab': 'c',
      '602c38e54a74a01bbc3478ac': 'cc',
      '602c38e54a74a01bbc3478ad': '',
      '602c38e54a74a01bbc3478ae': '2'
    }
  ]
]
*/
export const postForm = async (req: Request, res: Response) => {
  const sections = req.body;
  console.log('sections :>> ', sections);
  const user = req.user as User;
  let userResponses = new Map<string, string[]>();
  let updated = new Set<string>();
  const exists = await UserApplication.exists({ user: user._id });
  if (exists) {
    const x = await UserApplication.find({ user: user._id });
    userResponses = x[0].studentSubmissions.answers;
  }
  sections.forEach((section: any[]) => {
    section.forEach((sectionQuestions: any) => {
      // sectionQuestions is an object mapping ids to answers
      const questions = Object.keys(sectionQuestions);
      questions.forEach((question) => {
        if (!updated.has(question)) {
          userResponses.set(question, []);
          updated.add(question);
        }
        const answers = userResponses.get(question);
        const currQuestion = sectionQuestions[question];
        if (answers !== undefined && currQuestion !== undefined) {
          answers.push(currQuestion);
          userResponses.set(question, answers);
        }
      });
    });
  });

  console.log('a :>> ', userResponses);
  if (!exists) {
    await UserApplication.create({
      user: user._id,
      studentSubmissions: { _id: '0', name: 'Student', answers: userResponses },
    });
  } else {
    const q = await UserApplication.find({ user: user._id });
    const entry = q[0];
    entry.studentSubmissions.answers = userResponses;
    await entry.save();
  }
  return res.send('working');
};
