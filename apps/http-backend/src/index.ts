import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "Hello this is from http server..."
    })
})

async function main(){
    app.listen(3001);
    console.log(`Listernign on PORT 3000`);
}
main();