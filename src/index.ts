import app from './app';


app.listen(app.get('port'), () => {
    console.log(`Server runing on port: ${app.get('port')}`);
    console.log('Report generator server');
    console.log('github: S4basP');
});