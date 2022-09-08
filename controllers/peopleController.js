import person from '../models/People.js'

class PeopleController {
  static listPeople = (req, res) => {
    person.find((err, person) => {
        const page = req.query.page;
        const limit = req.query.limit;

        const startI = ((page - 1) * limit);
        const endI = (page * limit);
        const resultPerson = person.slice(startI, endI);

        res.status(200).json(resultPerson);
    })
  }

  static listPeopleByName = (req, res) => {
    const name = req.query.name;
    person.find({ name: { $regex: name }}, {}, (err, person) => {
        if (person.length == 0 || err) {
            res.status(404).send({ message: "User name not found" })
        } else { res.status(200).send(person)}
    })
  }

  static listPeopleById = (req, res) => {
    const id = req.params.id
    person.findById(id, (err, person) => {
      if (err) {
        res
          .status(404)
          .send({ message: `${err.message} - User id not found` })
      } else {
        const peopleStrip = { ...person['_doc'] }
        delete peopleStrip.password
        res.status(200).send(peopleStrip)
      }
    })
  }

  static registerPeople = (req, res) => {
    let people = new person(req.body)
    people.save((err, people) => {
      err
        ? res
            .status(500)
            .send({ message: `Register User Falied- ${err.message}` })
        : res.status(201).send(people.toJSON())
    })
  }

  static updatePeople = (req, res) => {
    const id = req.params.id
    person.findByIdAndUpdate(id, { $set: req.body }, err => {
      if (!err) {
        res.status(200).send({ message: 'User updated successfully' })
      } else {
        res.status(404).send({ message: `${err.message} - User Not Found` })
      }
    })
  }

  static deletePeople = (req, res) => {
    const id = req.params.id
    person.findByIdAndRemove(id, err => {
      if (!err) {
        res.status(204).send({ message: 'User successfully deleted' })
      } else {
        res.status(404)
      }
    })
  }
}

export default PeopleController;
