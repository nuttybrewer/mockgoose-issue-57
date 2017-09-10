/* eslint no-unused-expressions: "off" */

// const should = require('chai').should();
const expect = require('chai').expect;
const Mongoose = require('mongoose').Mongoose;

const mongoose = new Mongoose();
const Mockgoose = require('mockgoose').Mockgoose;

const mockgoose = new Mockgoose(mongoose);

// const Schema = mongoose.Schema;
// const catSchema = new Schema({
//  _catId: Schema.Types.ObjectId,
//  name: { type: mongoose.SchemaTypes.String, require: true, unique: true }
//});

// const Cat = mongoose.model('catModel', catSchema);
const Cat = require('../cat.js');

describe('User functions', () => {
  before((done) => {
    mockgoose.prepareStorage().then(() => {
      mongoose.Promise = global.Promise;
      mongoose.connect('mongodb://127.0.0.1:27017/TestingDB', { useMongoClient: true }, (err) => {
        done(err);
      });
    });
  });

  it('isMocked', (done) => {
    expect(mockgoose.helper.isMocked()).to.equal(true);
    done();
  });

  it('should create a cat foo', (done) => {
    const kitten = new Cat({ name: 'mittens' });
    kitten.save().catch(err => done(err));
    done();
  });

  it('should find cat foo', (done) => {
    const query = Cat.findOne({ name: 'mittens' });
    query.exec((err, cat) => {
      expect(err).to.equal(null);
      expect(cat).to.exist;
      expect(cat.name).to.equal('mittens');
      done(err);
    });
  });

  it('should remove cat foo', (done) => {
    Cat.remove({ name: 'mittens' }, (err, cat) => {
      expect(err).to.equal(null);
      expect(cat).to.exist;
      expect(cat.result.ok).to.equal(1);
      done(err);
    });
  });

  it('reset', (done) => {
    mockgoose.helper.reset().then(() => done());
  });
});
