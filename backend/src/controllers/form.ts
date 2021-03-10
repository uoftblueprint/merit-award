import { Request, Response } from 'express';
import { FormModel } from '../models/Form';
import { UserApplication } from '../models/UserApplication';
import { updateQuestions, getSchoolsList } from '../forms/forms'
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

// export const getAnswers = async (req: Request, res: Response) => {
//   const user = req.user as User;
//   console.log(user);
//   const q = await UserApplication.findOne({ user: user._id });
//   let answers = {};
//   if (q) {
//     const submissions = q.studentSubmissions;
//     answers = submissions.answers.toObject({ flattenMaps: true });
//   }
//   return res.json(answers);
// };

export const postForm = async (req: Request, res: Response) => {
  const sections = req.body;
  console.log('sections :>> ', sections);
  const user = req.user as User;
  let userResponses = new Map<string, string[]>();
  const updated = new Set<string>();
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

export const getSchools = async(req: Request, res: Response) => {
    const schools = await getSchoolsList();
    const schoolNames = schools.map(school => {
        return school.name;
    })
    return res.json(schoolNames);
}

export const getAnswers = async(req: Request, res: Response) => {
    const user = req.user as User;
    console.log(user);
    const q = await UserApplication.findOne({user: user._id})
    let answers = {}
    if (q) {
        const submissions = q.studentSubmissions;
        answers = submissions.answers.toObject({ flattenMaps: true });
    }
    return res.json(answers);
}

