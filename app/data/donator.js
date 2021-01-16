const Donator = require("../models/donator");

module.exports = {
  createDonator: (req, res) => {
    const { name, location, phone, email, dob } = req.body;
    new Donator({
      name: name,
      location: location,
      phone: phone,
      email: email,
      dob: dob,
    })
      .save()
      .then((d) => {
        console.log("Donor created !");
        res.status(201).send(d);
      })
      .catch((e) => {
        console.log(e);
        throw e;
        res.status(401).send({ err: e });
      });
  },

  getAllDonators: (req, res) => {
    new Donator()
      .fetchAll()
      .then((model) => {
        res.status(201).send(model);
      })
      .catch((e) => {
        console.log(e);
        throw e;
        res.status(401).send({ err: e });
      });
  },

  findByLocation: (req, res) => {
    const loc = req.params["loc"];
    // console.log(`id=${id}`);
    new Donator({ location: loc })
      .fetch()
      .then((don) => {
        res.status(201).send(don);
      })
      .catch((e) => {
       res.status(401).send(e); 
       console.log("Error Catch");

      });
  },
  findById: (req, res) => {
    const id = req.params["id"];
      // console.log(`id=${id}`);
    new Donator({ id: id })
      .fetch()
      .then((don) => {
        res.status(201).send(don);
      })
      .catch((error) => {

        res.status(401).send( error  );
        console.log("Error Catch");
      });
  },
    findByIdAndUpdate: (req, res) => {
      const id = req.params["id"];
      const { name, location, phone, email, dob } = req.body;
      new Donator({ id: id })
      .fetch().then((data)=>{
            data.save({
              name: name,
              location: location,
              phone: phone,
              email: email,
              dob: dob,
            }).then(()=>{
               res.status(201).send('Updated')

            }).catch((error)=>
            {
              res
              .status(401)
              .json({ message: error  } );
            })
      })
        .then((e) => {
          res
              .status(401)
              .json({ message: e  } );
        });
      
    },
  findByIdAndDelete: async (req, res) => {
    const id = req.params["id"];
    // console.log(id);
    new Donator({ id: id })
      .fetch()
      .then((data) => {
        data
          .destroy()
          .then(() => {
            res.send("Deleted");
          })
          .catch((error) => {
            res
              .status(500)
              .json({ error: true, data: { message: error.message } });
          });
      })
      .catch((error) => {
        res.status(500).json({ error: true, data: { message: error.message }});
      });
  },
};
