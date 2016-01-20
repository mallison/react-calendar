import expect from 'expect.js';
import * as utils from '../utils';

suite('minutesToTime', () => {
  test('should throw an error if non-integer', () => {
    expect(() => utils.minutesToTime('a')).to.throwException(/be an integer/);
  });

  test('should throw an error if negative', () => {
    expect(() => utils.minutesToTime(-1)).to.throwException(/not be negative/);
  });

  test('should throw an error if greater than 1439 (23:59)', () => {
    expect(() => utils.minutesToTime(1440)).to.throwException(/less than 1439/);
  });

  test('should return hour 12 if before 1am', () => {
    let [hour, minute, period] = utils.minutesToTime(0);
    expect(hour).to.equal(12);
  });

  test('should return minute', () => {
    let [hour, minute, period] = utils.minutesToTime(1);
    expect(minute).to.equal(1);
  });

  test('should return hour', () => {
    let [hour, minute, period] = utils.minutesToTime(120);
    expect(hour).to.equal(2);
  });

  test('should return hour in 12-hour clock if 1pm or after', () => {
    let [hour, minute, period] = utils.minutesToTime(780);
    expect(hour).to.equal(1);
  });

  test('should return am for period if before 12pm', () => {
    let [hour, minute, period] = utils.minutesToTime(360);
    expect(period).to.equal('AM');
  });

  test('should return pm for period if 12pm or after', () => {
    let [hour, minute, period] = utils.minutesToTime(720);
    expect(period).to.equal('PM');
  });
  
});
