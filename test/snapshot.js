'use strict'

const test = require('ava')
const ps = require('..')

test('default', async t => {
  const tasks = await ps.snapshot()
  t.true(Array.isArray(tasks))
  t.not(tasks.length, 0)
  t.deepEqual(Object.keys(tasks[0]), ps.allowedFields)
})

test('one field', async t => {
  const tasks = await ps.snapshot('pid')

  t.true(Array.isArray(tasks))
  t.not(tasks.length, 0)
  t.deepEqual(Object.keys(tasks[0]), ['pid'])
})

test('multiple fields as arguments', async t => {
  const tasks = await ps.snapshot('pid', 'name', 'starttime', 'cpu')

  t.true(Array.isArray(tasks))
  t.not(tasks.length, 0)
  t.deepEqual(Object.keys(tasks[0]), ['name', 'pid', 'starttime', 'cpu'])
})

test('check every field one-by-one', async t => {
  for (const field of ps.allowedFields) {
    const tasks = await ps.snapshot(field)

    t.true(Array.isArray(tasks))
    t.not(tasks.length, 0)
    t.deepEqual(Object.keys(tasks[0]), [field])
  }
})
