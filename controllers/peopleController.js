import person from '../models/People.js'

class PeopleController {
  static listPeople = (req, res) => {
    person.find((err, person) => {
      res.status(200).json(person)
    })
  }

  static listPeopleByName = (req, res) => {
    const name = req.query.name;
    person.find({ name: { $regex: name }}, {}, (err, person) => {
        if (person.length == 0 || err) {
            res.status(404).send({ message: "Person name not found" })
        } else { res.status(200).send(person)}
    })
  }

  static listPeopleById = (req, res) => {
    const id = req.params.id
    person.findById(id, (err, person) => {
      if (err) {
        res
          .status(404)
          .send({ message: `${err.message} - Person id not found` })
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
            .send({ message: `Register Person Falied- ${err.message}` })
        : res.status(201).send(people.toJSON())
    })
  }

  static updatePeople = (req, res) => {
    const id = req.params.id
    person.findByIdAndUpdate(id, { $set: req.body }, err => {
      if (!err) {
        res.status(200).send({ message: 'Person updated successfully' })
      } else {
        res.status(404).send({ message: `${err.message} - Person Not Found` })
      }
    })
  }

  static deletePeople = (req, res) => {
    const id = req.params.id
    person.findByIdAndRemove(id, err => {
      if (!err) {
        res.status(204).send({ message: 'Person successfully deleted' })
      } else {
        res.status(404)
      }
    })
  }
}

export default PeopleController
