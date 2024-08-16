const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 4000
const config = {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'nodedb',
}

const connection = mysql.createConnection(config)

app.get('/', (req,res) => {
    const peopleSelect = `SELECT * FROM people;`
    connection.query(peopleSelect, (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta de seleção: ' + err.stack);
            res.status(500).send('Erro ao acessar o banco de dados');
            return;
        }
        
        const names = results.map(person => person.name).join('<br>');
         res.send(`<h1>Full Cycle Rocks!!</h1><p>Nomes cadastrados no banco de dados</p><p>${names}</p>`)
    })

})

app.listen(port, () => {
    console.log('Rodando na porta '+port)
})

process.on('SIGINT', () => {
    connection.end(err => {
        if (err) {
            console.error('Erro ao fechar a conexão: ' + err.stack);
        }
        console.log('Conexão com o banco de dados fechada.');
        process.exit();
    });
});