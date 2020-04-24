// Bootstrap testing
const { DocumentClient } = require('./bootstrap-tests')

// Require Table and Entity classes
const Table = require('../classes/Table')
const Entity = require('../classes/Entity')


describe('Table creation', ()=> {

  it('creates table w/ minimum options', async () => {
    const TestTable = new Table({
      name: 'test-table',
      partitionKey: 'pk'
    })

    expect(TestTable instanceof Table).toBe(true)
    expect(TestTable.name).toBe('test-table')
    expect(TestTable.Table.partitionKey).toBe('pk')
    expect(TestTable.Table.sortKey).toBeNull()
    expect(TestTable.Table.entityField).toBe('_tp')
    expect(TestTable.Table.indexes).toEqual({})
    expect(TestTable.Table.attributes).toEqual({ _tp: { type: 'string' } })
    expect(TestTable.autoExecute).toBe(true)
    expect(TestTable.autoParse).toBe(true)
    expect(TestTable.entities).toEqual([])
  }) // end table


  it('creates table w/ options', async () => {
    const TestTable = new Table({
      name: 'test-table',
      partitionKey: 'pk',
      sortKey: 'sk',
      entityField: 'entity',
      autoExecute: false,
      autoParse: false
    })

    expect(TestTable instanceof Table).toBe(true)
    expect(TestTable.name).toBe('test-table')
    expect(TestTable.Table.partitionKey).toBe('pk')
    expect(TestTable.Table.sortKey).toBe('sk')
    expect(TestTable.Table.entityField).toBe('entity')
    expect(TestTable.Table.indexes).toEqual({})
    expect(TestTable.Table.attributes).toEqual({ entity: { type: 'string' } })
    expect(TestTable.autoExecute).toBe(false)
    expect(TestTable.autoParse).toBe(false)
    expect(TestTable.entities).toEqual([])
  }) // end table w/ options


  it('creates table w/ attributes', async () => {
    const TestTable = new Table({
      name: 'test-table',
      partitionKey: 'pk',
      attributes: {
        stringAttr: 'string',
        numberAttr: 'number',
        binaryAttr: 'binary',
        booleanAttr: 'boolean',
        listAttr: 'list',
        mapAttr: 'map',
        stringSetAttr: 'set',
        numberSetAttr: { type: 'set', setType: 'number'},
        binarySetAttr: { type: 'set', setType: 'binary'}
      }
    })

    expect(TestTable instanceof Table).toBe(true)
    expect(TestTable.name).toBe('test-table')
    expect(TestTable.Table.partitionKey).toBe('pk')
    expect(TestTable.Table.sortKey).toBeNull()
    expect(TestTable.Table.entityField).toBe('_tp')
    expect(TestTable.Table.indexes).toEqual({})
    expect(TestTable.autoExecute).toBe(true)
    expect(TestTable.autoParse).toBe(true)
    expect(TestTable.entities).toEqual([])

    // Check attribute parsing
    expect(TestTable.Table.attributes).toEqual({
      stringAttr: { type: 'string' },
      numberAttr: { type: 'number' },
      binaryAttr: { type: 'binary' },
      booleanAttr: { type: 'boolean' },
      listAttr: { type: 'list' },
      mapAttr: { type: 'map' },
      stringSetAttr: { type: 'set' },
      numberSetAttr: { type: 'set', setType: 'number' },
      binarySetAttr: { type: 'set', setType: 'binary' },
      _tp: { type: 'string' }
    })
  }) // end table w/ attributes


  it('creates table w/ indexes', async () => {
    const TestTable = new Table({
      name: 'test-table',
      partitionKey: 'pk',
      indexes: {
        // GSI w/ pk and sk
        GSI1: { partitionKey: 'GSI1pk', sortKey: 'GSI1sk' },
        // GSI w/ only pk
        GSI2: { partitionKey: 'GSI2pk' },
        // LSI w/ reused pk
        LSI1: { partitionKey: 'pk', sortKey: 'LSI1sk' },
        // LSI w/ only sk
        LSI2: { sortKey: 'LSI2sk' }
      }
    })    

    expect(TestTable instanceof Table).toBe(true)
    expect(TestTable.name).toBe('test-table')
    expect(TestTable.Table.partitionKey).toBe('pk')
    expect(TestTable.Table.sortKey).toBeNull()
    expect(TestTable.Table.entityField).toBe('_tp')
    expect(TestTable.Table.attributes).toEqual({ _tp: { type: 'string' } })
    expect(TestTable.autoExecute).toBe(true)
    expect(TestTable.autoParse).toBe(true)
    expect(TestTable.entities).toEqual([])

    // Verify index parsing
    expect(TestTable.Table.indexes).toEqual({
      GSI1: { partitionKey: 'GSI1pk', sortKey: 'GSI1sk', type: 'GSI' },
      GSI2: { partitionKey: 'GSI2pk', type: 'GSI' },
      LSI1: { sortKey: 'LSI1sk', type: 'LSI' },
      LSI2: { sortKey: 'LSI2sk', type: 'LSI' }
    })
  }) // end table w/ indexes


  it('creates table w/ DocumentClient', async () => {
    const TestTable = new Table({
      name: 'test-table',
      partitionKey: 'pk',
      DocumentClient
    })

    expect(TestTable instanceof Table).toBe(true)
    expect(TestTable.DocumentClient.constructor.name).toBe('DocumentClient')
    expect(TestTable.name).toBe('test-table')
    expect(TestTable.Table.partitionKey).toBe('pk')
    expect(TestTable.Table.sortKey).toBeNull()
    expect(TestTable.Table.entityField).toBe('_tp')
    expect(TestTable.Table.indexes).toEqual({})
    expect(TestTable.Table.attributes).toEqual({ _tp: { type: 'string' } })
    expect(TestTable.autoExecute).toBe(true)
    expect(TestTable.autoParse).toBe(true)
    expect(TestTable.entities).toEqual([])
  }) // end create table w/ DocumentClient


  it('creates table, then add DocumentClient', async () => {
    const TestTable = new Table({
      name: 'test-table',
      partitionKey: 'pk'
    })

    // Add the DocumentClient
    TestTable.DocumentClient = DocumentClient

    expect(TestTable instanceof Table).toBe(true)
    expect(TestTable.DocumentClient.constructor.name).toBe('DocumentClient')
    expect(TestTable.name).toBe('test-table')
    expect(TestTable.Table.partitionKey).toBe('pk')
    expect(TestTable.Table.sortKey).toBeNull()
    expect(TestTable.Table.entityField).toBe('_tp')
    expect(TestTable.Table.indexes).toEqual({})
    expect(TestTable.Table.attributes).toEqual({ _tp: { type: 'string' } })
    expect(TestTable.autoExecute).toBe(true)
    expect(TestTable.autoParse).toBe(true)
    expect(TestTable.entities).toEqual([])
  }) // end create table w/ DocumentClient



  it('creates table w/ entity', async () => {
  
    // Create basic entity
    const TestEntity = new Entity({
      name: 'TestEnt',
      attributes: {
        pk: { partitionKey: true }
      }
    })

    // Create basic table
    const TestTable = new Table({
      name: 'test-table',
      partitionKey: 'pk',
      entities: TestEntity
    })

    expect(TestTable instanceof Table).toBe(true)
    expect(TestTable.name).toBe('test-table')
    expect(TestTable.Table.partitionKey).toBe('pk')
    expect(TestTable.Table.sortKey).toBeNull()
    expect(TestTable.Table.entityField).toBe('_tp')
    expect(TestTable.Table.indexes).toEqual({})
    // expect(TestTable.Table.attributes).toEqual({
    //   _tp: { type: 'string' },
    //   pk: { type: 'string', mappings: { TestEnt: 'pk' } },
    //   _ct: { type: 'string', mappings: { TestEnt: 'created' } },
    //   _md: { type: 'string', mappings: { TestEnt: 'modified' } }
    // })
    expect(TestTable.autoExecute).toBe(true)
    expect(TestTable.autoParse).toBe(true)
    expect(TestTable.entities).toEqual(['TestEnt'])
  }) // creates table w/ entity


})
