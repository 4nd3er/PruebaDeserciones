const registar = (req, res) => {
    console.log(req.body);
    res.json({msg : 'Creando usuario'});
}

export { registar };