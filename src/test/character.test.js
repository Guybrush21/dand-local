import MaleNameGenerator from '../generators/maleNameGenerator'
import FemaleNameGenerator from '../generators/femaleNameGenerator';
import ClassGenerator from '../generators/classGenerator';
import SexGenerator from '../generators/sexGenerator';
import RaceGenerator from '../generators/raceGenerator';
import CharacterGenerator from '../generators/characterGenerator';

test('get random male name', () => {
  let malename = new MaleNameGenerator()
  expect(malename.next()).toBeDefined()
});

test('get random female name', () => {
  let gen = new FemaleNameGenerator()
  expect(gen.next()).toBeDefined()
});

test('get random class', () => {
  let gen = new ClassGenerator()
  expect(gen.next()).toBeDefined()
});

test('get random sex', () => {
  let gen = new SexGenerator()
  expect(gen.next()).toBeDefined()
});

test('get random race', () => {
  let gen = new RaceGenerator()
  expect(gen.next()).toBeDefined()
});

test('complete random character', () => {
  let gen = new CharacterGenerator()
  let c = gen.next()
  expect(c).toBeDefined()
  expect(c.class).toBeDefined()
  expect(c.name).toBeDefined()
  expect(c.sex).toBeDefined()
  expect(c.race).toBeDefined()
  expect(c.isFavorite).toBe(false)

});