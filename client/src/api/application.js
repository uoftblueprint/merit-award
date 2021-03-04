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

export const getAnswers = async () => {
    try {
        const res = await client.get('/api/forms/answers/');
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const postResponses = async (data) => {
    try {
        //data [{q: a}, {q, a}]
        console.log('data :>> ', data);
        const res = await client.post('/api/forms/response', data);
        console.log(res)
        if (!res || res.status !== 200) {
            throw 'Could not post response';
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}
