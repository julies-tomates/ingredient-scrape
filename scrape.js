const got = require('got');
const cheerio = require('cheerio');
const  fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

const url = 'https://www.kingarthurbaking.com/learn/ingredient-weight-chart';

//write Headers
writeStream.write(`Ingredient,Volume,Ounces,Grams \n`);


/* const getIngredients = async() => { */

(async() => {

    try{
        const response = await got(url);
        const $ = cheerio.load(response.body);
        //const ingredient_list = [];

        $('tbody tr').each(function() {
            let ingredient = $(this).children('th').text().replace(/,/g, '/');
            let units = $(this).children('td');

            let volume = units.eq(0).text();
            let ounces = units.eq(1).text();
            let grams = units.eq(2).text();

            //console.log(ingredient);
            //Write Row to CSV
            writeStream.write(`${ingredient}, ${volume}, ${ounces}, ${grams} \n`)
        });

/*
        //$('tbody tr th').text();
        $('tbody tr').each(function() {
            let ingredient = $(this).children('th');
            let units = $(this).children('td');

            let item = {
                ingredient: ingredient.text(),
                volume: units.eq(0).text(),
                ounces: units.eq(1).text(),
                grams: units.eq(2).text()
            }
            ingredient_list.push(item);   
        })
        return ingredient_list;
*/


    } catch (error) {
        console.log(error.response.body);
    }
})();

//getIngredients().then((ingredients) => console.log(ingredients));
