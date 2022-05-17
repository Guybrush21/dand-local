import Generator from './generator'

export default class SexGenerator extends Generator {
  constructor () {
    const races = ['female', 'male']
    super(races)
  }
}
