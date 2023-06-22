
async function start(){
    await Promise.resolve('async works')
}

start().then(data=> console.log(data))