import client from './axios';

export const getQuestions = async (page) => {
    try {
        const questions = await client.get('/api/forms/questions/'+page);
  
        if (!questions || questions.status !== 200) {
            throw 'Could not get questions';
        }
        return questions.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};