import type { HookParameterDefinition, OperationDefinition, TxnParameterDefinition } from 'hooks-schema/dist'
import { hookParametersParser, hookStateParser, invokeBlobParser, readOperation, txnParametersParser, writeOperation } from '../src'

describe('hookStateParser', () => {
  it('UInt8, VarString, AccountID', () => {
    const result = hookStateParser(
      {
        // Flags: 0,
        HookStateData: '7FB3E32A0E968D8D69AEED05DF298574C43996D9',
        HookStateKey: '565306020000000000000000BEF78C206179940F3BCA042067619C78018C9B82',
        LedgerEntryType: 'HookState',
        OwnerNode: '2',
        index: 'CAC02451AD6AE6B300F3887216A10850B426F24EEE35932090084C94485459D5',
      },
      {
        fields: [
          {
            name: 'Vote Seat',
            hookstate_key: [
              {
                type: 'VarString',
                name: 'type',
                pattern: 'VS',
                byte_length: 2,
              },
              {
                type: 'UInt8',
                name: 'SeatID',
              },
              {
                type: 'UInt8',
                name: 'Layer',
              },
              {
                type: 'VarString',
                name: 'padding',
                byte_length: 8,
                pattern: null,
                binary: true,
                exclude: true,
              },
              {
                type: 'AccountID',
                name: 'Account',
              },
            ],
            hookstate_data: [
              {
                type: 'AccountID',
                name: 'Account',
              },
            ],
          },
        ],
      },
    )
    expect(result).toEqual({
      name: 'Vote Seat',
      key: [
        { name: 'type', value: 'VS' },
        { name: 'SeatID', value: 6 },
        { name: 'Layer', value: 2 },
        { name: 'Account', value: 'rJQjALkWExMsg8Ub7LYKyCoGakGiHqR4C2' },
      ],
      data: [{ name: 'Account', value: 'rUeNKwrjBXRDHZft2KqBozc13CBnJg17LF' }],
    })
  })

  it('Uint16, UInt32, XFL', () => {
    const result = hookStateParser(
      {
        // Flags: 0,
        HookStateData:
          'B0B4EA2F24C9BFB2DC8E1A33854A846328116BB8496E74656C2852292058656F6E28522920476F6C6420363233302043505520322E313047487A000006002F0800350C000320000064210100657665726E6F646540746571752E64657600000000000000000000000000000000000000000000007EB7A16BEBCD5054',
        HookStateKey: '455652027D08B521F9AAC356DA8F4213BF0537B0D3300204CCAB480AC8A117C5',
        LedgerEntryType: 'HookState',
        OwnerNode: '0',
        index: '289839649E32A1D8FB0FE882A80DCE022202598869C2E7F3D4F7C264C3D2F220',
      },
      {
        fields: [
          {
            name: 'Token Id',
            hookstate_key: [
              {
                type: 'VarString',
                name: 'Key',
                pattern: 'EVR',
                byte_length: 3,
                exclude: true,
              },
              {
                type: 'UInt8',
                name: 'Index',
                pattern: '2',
                exclude: true,
              },
              {
                type: 'VarString',
                name: 'TokenID',
                byte_length: 28,
                binary: true,
              },
            ],
            hookstate_data: [
              {
                type: 'AccountID',
                name: 'Host Address',
              },
              {
                type: 'VarString',
                name: 'CPU Model Name',
                byte_length: 40,
              },
              {
                type: 'UInt16',
                name: 'CPU Count',
              },
              {
                type: 'UInt16',
                name: 'CPU Speed',
              },
              {
                type: 'UInt32',
                name: 'CPU Microsec',
              },
              {
                type: 'UInt32',
                name: 'RAM MB',
              },
              {
                type: 'UInt32',
                name: 'Disk MB',
              },
              {
                type: 'VarString',
                name: 'Email',
                byte_length: 40,
              },
              {
                type: 'XFL',
                name: 'Accumulated Reward Amount',
              },
            ],
          },
        ],
      },
    )
    expect(result).toEqual({
      name: 'Token Id',
      key: [
        {
          name: 'TokenID',
          value: '7D08B521F9AAC356DA8F4213BF0537B0D3300204CCAB480AC8A117C5',
        },
      ],
      data: [
        {
          name: 'Host Address',
          value: 'rHfLeAcShzsicdcepwFqM7syUikCQ6dDXi',
        },
        {
          name: 'CPU Model Name',
          value: 'Intel(R) Xeon(R) Gold 6230 CPU 2.10GHz',
        },
        { name: 'CPU Count', value: 6 },
        { name: 'CPU Speed', value: 2095 },
        { name: 'CPU Microsec', value: 800000 },
        { name: 'RAM MB', value: 8195 },
        { name: 'Disk MB', value: 74084 },
        { name: 'Email', value: 'evernode@tequ.dev' },
        { name: 'Accumulated Reward Amount', value: 0.4730010634139518 },
      ],
    })
  })

  it('UInt64, Array', () => {
    const result = hookStateParser(
      {
        // Flags: 0,
        HookStateData:
          '8696D17C7D08B521F9AAC356DA8F4213BF0537B0D3300204CCAB480AC8A117C54A5000000000000000002000000000000000000000000000000000000000000000000000808C210000000000F4010000000000000C00000000000000DC67486600000000000803BAD8A465000000000000000000000000000000000000C80100000000000000000080C6A47E8D0354',
        HookStateKey: '455652030000000000000000B0B4EA2F24C9BFB2DC8E1A33854A846328116BB8',
        LedgerEntryType: 'HookState',
        OwnerNode: '0',
        index: '20CC24ADB712E5A49A1F4E9309A3CCBFA071BCBB1380B781A0DB21124412A1B9',
      },
      {
        fields: [
          {
            name: 'Host Address',
            hookstate_key: [
              {
                type: 'VarString',
                name: 'Key',
                pattern: 'EVR',
                byte_length: 3,
                exclude: true,
              },
              {
                type: 'UInt8',
                name: 'Index',
                pattern: '3',
                exclude: true,
              },
              {
                type: 'VarString',
                name: 'padding',
                byte_length: 8,
                pattern: null,
                binary: true,
                exclude: true,
              },
              {
                type: 'AccountID',
                name: 'Account',
              },
            ],
            hookstate_data: [
              {
                type: 'VarString',
                name: 'TokenID',
                byte_length: 32,
                binary: true,
              },
              {
                type: 'VarString',
                name: 'Country Code',
                byte_length: 2,
              },
              {
                type: 'VarString',
                name: 'Reserved',
                byte_length: 8,
              },
              {
                type: 'VarString',
                name: 'Description',
                byte_length: 26,
              },
              {
                type: 'UInt64',
                name: 'Registration Ledger',
              },
              {
                type: 'UInt64',
                name: 'Registration Fee',
              },
              {
                type: 'UInt32',
                name: 'No of Total Instances',
              },
              {
                type: 'UInt32',
                name: 'No of Active Instances',
              },
              {
                type: 'UInt64',
                name: 'Last Heartbeat Index',
              },
              {
                type: 'Array',
                name: 'Version',
                array: [
                  {
                    type: 'UInt8',
                    name: 'major',
                  },
                  {
                    type: 'UInt8',
                    name: 'minor',
                  },
                  {
                    type: 'UInt8',
                    name: 'patch',
                  },
                ],
                array_length: 3,
                byte_length: 3,
                delimiter: '.',
              },
              {
                type: 'UInt64',
                name: 'Registration Timestamp',
              },
              {
                type: 'UInt8',
                name: 'Transfer Flag',
              },
              {
                type: 'UInt32',
                name: 'Last Vote Candidate Idx',
              },
              {
                type: 'UInt64',
                name: 'Last Vote Timestamp',
              },
              {
                type: 'UInt8',
                name: 'Support Vote Sent',
              },
              {
                type: 'UInt8',
                name: 'Host Reputation',
              },
              {
                type: 'UInt8',
                name: 'Flags',
              },
              {
                type: 'UInt64',
                name: 'Transfer Timestamp',
              },
              {
                type: 'XFL',
                name: 'Host Lease Amount',
              },
            ],
          },
        ],
      },
    )
    expect(result).toEqual({
      name: 'Host Address',
      key: [{ name: 'Account', value: 'rHfLeAcShzsicdcepwFqM7syUikCQ6dDXi' }],
      data: [
        {
          name: 'TokenID',
          value: '8696D17C7D08B521F9AAC356DA8F4213BF0537B0D3300204CCAB480AC8A117C5',
        },
        { name: 'Country Code', value: 'JP' },
        { name: 'Reserved', value: '' },
        { name: 'Description', value: ' ' },
        { name: 'Registration Ledger', value: 2198656n },
        { name: 'Registration Fee', value: 500n },
        { name: 'No of Total Instances', value: 12 },
        { name: 'No of Active Instances', value: 0 },
        { name: 'Last Heartbeat Index', value: 1716021212n },
        {
          name: 'Version',
          value: [
            { name: 'major', value: 0 },
            { name: 'minor', value: 8 },
            { name: 'patch', value: 3 },
          ],
        },
        { name: 'Registration Timestamp', value: 1705302202n },
        { name: 'Transfer Flag', value: 0 },
        { name: 'Last Vote Candidate Idx', value: 0 },
        { name: 'Last Vote Timestamp', value: 0n },
        { name: 'Support Vote Sent', value: 0 },
        { name: 'Host Reputation', value: 200 },
        { name: 'Flags', value: 1 },
        { name: 'Transfer Timestamp', value: 0n },
        { name: 'Host Lease Amount', value: 0.01 },
      ],
    })
  })
  it('Hash256', () => {
    const result = hookStateParser(
      {
        // Flags: 0,
        HookStateData:
          '010000000041020000BAC74966000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        HookStateKey: '4556523700000000000000000000000000000000000000000000000000000000',
        LedgerEntryType: 'HookState',
        OwnerNode: '0',
        index: 'B4482A03829DD071EB5E312C5F6F81D9CB0A72B751F022CB4208B80CEE48DE5A',
      },
      {
        fields: [{
          name: 'Governance Info',
          hookstate_key: [
            {
              type: 'VarString',
              name: 'Key',
              pattern: 'EVR',
              byte_length: 3,
              exclude: true,
            },
            {
              type: 'UInt8',
              name: 'Index',
              pattern: '55',
              exclude: true,
            },
            {
              type: 'VarString',
              name: 'padding',
              byte_length: 28,
              pattern: null,
              binary: true,
              exclude: true,
            },
          ],
          // <governance_mode(1)><last_candidate_idx(4)><voter_base_count(4)><voter_base_count_changed_timestamp(8)><foundation_last_voted_candidate_idx(4)><foundation_last_voted_timestamp(8)><elected_proposal_unique_id(32)>
          // <proposal_elected_timestamp(8)><updated_hook_count(1)>
          hookstate_data: [
            {
              type: 'UInt8',
              name: 'Governance Mode',
            },
            {
              type: 'UInt32',
              name: 'Last Candidate Idx',
            },
            {
              type: 'UInt32',
              name: 'Voter Base Count',
            },
            {
              type: 'UInt64',
              name: 'Voter Base Count Changed Timestamp',
            },
            {
              type: 'UInt32',
              name: 'Foundation Last Voted Candidate Idx',
            },
            {
              type: 'UInt64',
              name: 'Foundation Last Voted Timestamp',
            },
            {
              type: 'Hash256',
              name: 'Elected Proposal Unique Id',
            },
            {
              type: 'UInt64',
              name: 'Proposal Elected Timestamp',
            },
            {
              type: 'UInt8',
              name: 'Updated Hook Count',
            },
          ],
        }],
      },
    )
    expect(result).toEqual({
      name: 'Governance Info',
      key: [],
      data: [
        { name: 'Governance Mode', value: 1 },
        { name: 'Last Candidate Idx', value: 0 },
        { name: 'Voter Base Count', value: 577 },
        { name: 'Voter Base Count Changed Timestamp', value: 1716111290n },
        { name: 'Foundation Last Voted Candidate Idx', value: 0 },
        { name: 'Foundation Last Voted Timestamp', value: 0n },
        {
          name: 'Elected Proposal Unique Id',
          value: '0000000000000000000000000000000000000000000000000000000000000000'
        },
        { name: 'Proposal Elected Timestamp', value: 0n },
        { name: 'Updated Hook Count', value: 0 }
      ]
    })
  })
})

describe('invokeBlobParser', () => {
  it('blob', () => {
    const result = invokeBlobParser('A3B6B1B61181DB9C81EED4F3D5109F6CFC31109B000000000000000000000000455652000000000000602D24360F8954',
      {
        fields: [
          {
            name: 'Oracle Set',
            value: [
              {
                type: 'Array',
                name: 'Oracles',
                array: [
                  {
                    type: 'AccountID',
                    name: 'issuer',
                  },
                  {
                    type: 'VarString',
                    byte_length: 20,
                    name: 'currency',
                  },
                  {
                    type: 'XFL',
                    name: 'value',
                  },
                ],
                length_prefix: true,
              },
            ],
          },
        ]
      })
    expect(result).toEqual({
      name: "Oracle Set",
      values: [
        {
          name: "Oracles",
          value: [
            {
              name: "issuer",
              value: "rEvernodee8dJLaFsujS6q1EiXvZYmHXr8"
            },
            {
              name: "currency",
              value: "EVR"
            },
            {
              name: "value",
              value: 2.55
            }
          ]
        }
      ]
    })
  })
})

describe('txnParametersParser', () => {
  const definition: TxnParameterDefinition = {
    fields: [
      {
        name: 'Layer',
        transaction_types: ['Invoke'],
        otxnparam_key: [
          {
            type: 'VarString',
            name: 'topic',
            pattern: 'L',
            byte_length: 1,
            exclude: true,
          },
        ],
        otxnparam_data: [
          {
            type: 'UInt8',
            name: 'Layer',
          },
        ],
      },
      {
        name: 'Vote for',
        transaction_types: ['Invoke'],
        otxnparam_key: [
          {
            type: 'VarString',
            name: 'topic',
            pattern: 'T',
            byte_length: 1,
            exclude: true,
          },
        ],
        otxnparam_data: [
          {
            type: 'VarString',
            name: 'Seat',
            pattern: 'S',
            byte_length: 1,
            exclude: true,
          },
          {
            type: 'UInt8',
            name: 'Seat ID',
          },
        ],
      },
      {
        name: 'Vote for',
        transaction_types: ['Invoke'],
        otxnparam_key: [
          {
            type: 'VarString',
            name: 'topic',
            pattern: 'T',
            byte_length: 1,
            exclude: true,
          },
        ],
        otxnparam_data: [
          {
            type: 'VarString',
            name: 'Hook',
            pattern: 'H',
            byte_length: 1,
            exclude: true,
          },
          {
            type: 'UInt8',
            name: 'Hook Index',
          },
        ],
      },

      {
        name: 'Vote for',
        transaction_types: ['Invoke'],
        otxnparam_key: [
          {
            type: 'VarString',
            name: 'topic',
            pattern: 'T',
            byte_length: 1,
            exclude: true,
          },
        ],
        otxnparam_data: [
          {
            type: 'VarString',
            name: 'RewardRate',
            pattern: 'RR',
            byte_length: 2,
          },
        ],
      },
      {
        name: 'Vote for',
        transaction_types: ['Invoke'],
        otxnparam_key: [
          {
            type: 'VarString',
            name: 'topic',
            pattern: 'T',
            byte_length: 1,
            exclude: true,
          },
        ],
        otxnparam_data: [
          {
            type: 'VarString',
            name: 'RewardDelay',
            pattern: 'RD',
            byte_length: 2,
          },
        ],
      },
      {
        name: 'Vote value',
        transaction_types: ['Invoke'],
        otxnparam_key: [
          {
            type: 'VarString',
            name: 'value',
            pattern: 'V',
            byte_length: 1,
            exclude: true,
          },
        ],
        otxnparam_data: [
          {
            type: 'AccountID',
            name: 'Account',
          },
        ],
      },
      {
        name: 'Vote value',
        transaction_types: ['Invoke'],
        otxnparam_key: [
          {
            type: 'VarString',
            name: 'value',
            pattern: 'V',
            byte_length: 1,
            exclude: true,
          },
        ],
        otxnparam_data: [
          {
            type: 'Hash256',
            name: 'HookHash',
          },
        ],
      },
      {
        name: 'Vote value',
        transaction_types: ['Invoke'],
        otxnparam_key: [
          {
            type: 'VarString',
            name: 'value',
            pattern: 'V',
            byte_length: 1,
            exclude: true,
          },
        ],
        otxnparam_data: [
          {
            type: 'XFL',
            name: 'value',
          },
        ],
      },
    ]
  }
  it('', () => {
    const result = txnParametersParser({
      HookParameter: { HookParameterName: "4C", HookParameterValue: "02" }
    }, definition)
    expect(result).toEqual({
      name: 'Layer',
      key: [],
      data: [{ name: 'Layer', value: 2 }]
    })

    const result2 = txnParametersParser({
      HookParameter: { HookParameterName: "54", HookParameterValue: "4800" }
    }, definition)
    expect(result2).toEqual({
      name: 'Vote for',
      key: [],
      data: [{ name: 'Hook Index', value: 0 }],
    })

    const result3 = txnParametersParser({
      HookParameter: { HookParameterName: "56", HookParameterValue: "FAC0FAF928B48D7D113B95A07129E5E161AA5CCFCB4AEE0BC49B5795645CEFCD" }
    }, definition)
    expect(result3).toEqual({
      name: 'Vote value',
      key: [],
      data: [{
        name: 'HookHash',
        value: 'FAC0FAF928B48D7D113B95A07129E5E161AA5CCFCB4AEE0BC49B5795645CEFCD'
      }],
    })
  })
})

describe('hookParametersParser', () => {
  it('', () => {

    const definition: HookParameterDefinition = {
      fields: [
        {
          name: 'Initial Member Count',
          hookparam_key: [
            {
              type: 'VarString',
              name: 'Initial Member Count',
              pattern: 'IMC',
              byte_length: 3,
            },
          ],
          hookparam_data: [
            {
              type: 'UInt8',
              name: 'Count',
            },
          ],
        },
        {
          name: 'Initial Reward Rate',
          hookparam_key: [
            {
              type: 'VarString',
              name: 'Initial Reward Rate',
              pattern: 'IRR',
              byte_length: 3,
              exclude: true,
            },
          ],
          hookparam_data: [
            {
              type: 'XFL',
              name: 'Reward Rate',
            },
          ],
        },
        {
          name: 'Initial Reward Delay',
          hookparam_key: [
            {
              type: 'VarString',
              name: 'Initial Reward Delay',
              pattern: 'IRD',
              byte_length: 3,
              exclude: true,
            },
          ],
          hookparam_data: [
            {
              type: 'XFL',
              name: 'Reward Delay',
            },
          ],
        },
        {
          name: 'Initial Seat',
          hookparam_key: [
            {
              type: 'VarString',
              name: 'Initial Seat',
              pattern: 'IS',
              byte_length: 2,
              exclude: true,
            },
            {
              type: 'UInt8',
              name: 'Index',
            },
          ],
          hookparam_data: [
            {
              type: 'AccountID',
              name: 'Account',
            },
          ],
        },
      ]
    }
    const result = hookParametersParser({
      HookParameter: {
        HookParameterName: "495252",
        HookParameterValue: "55554025A6D7CB53"
      }
    }, definition)
    expect(result).toEqual({
      name: 'Initial Reward Rate',
      key: [],
      data: [{ name: 'Reward Rate', value: 0.003333333333333333 }]
    })

    const result1 = hookParametersParser({
      HookParameter: {
        HookParameterName: "495300",
        HookParameterValue: "88CECA8ED635F79573136EAAA2B70F07C2F2B9D8"
      }
    }, definition)
    expect(result1).toEqual({
      name: 'Initial Seat',
      key: [{ name: 'Index', value: 0 }],
      data: [{ name: 'Account', value: 'rD74dUPRFNfgnY2NzrxxYRXN4BrfGSN6Mv' }]
    })
  })
})

const operationDefinition = {
  write: {
    voteToSeat: {
      data: {
        layer: 'UInt8',
        seatId: 'UInt8',
        value: 'AccountID',
      },
      txn_parameter_definition: [
        {
          key: [
            {
              type: 'VarString',
              name: 'Topic',
              pattern: 'T',
              byte_length: 1,
            },
          ],
          data: [
            {
              type: 'VarString',
              name: 'Seat',
              pattern: 'S',
              byte_length: 1,
            },
            {
              type: 'UInt8',
              name: 'Seat ID',
              field: 'seatId',
            },
          ],
        },
        {
          key: [
            {
              type: 'VarString',
              name: 'Layer',
              pattern: 'L',
              byte_length: 1,
            },
          ],
          data: [
            {
              type: 'UInt8',
              name: 'Layer',
              field: 'layer',
            },
          ],
        },
        {
          key: [
            {
              type: 'VarString',
              name: 'Vote',
              pattern: 'V',
              byte_length: 1,
            },
          ],
          data: [
            {
              type: 'AccountID',
              name: 'Value',
              field: 'value',
            },
          ],
        },
      ],
    },
    // voteToHook: {
    //   data: {},
    //   txn_parameter_definition: [
    //     {
    //       key: [],
    //       data: [],
    //     },
    //   ]
    // },
    // voteToRewardRate: {
    //   data: {},
    //   txn_parameter_definition: [
    //     {
    //       key: [],
    //       data: [],
    //     },
    //   ]
    // },
    // voteToRewardDelay: {
    //   data: {},
    //   txn_parameter_definition: [
    //     {
    //       key: [],
    //       data: [],
    //     },
    //   ]
    // }
  },
  read: {
    currentMemberCount: {
      args: {},
      returns: {
        count: 'UInt8',
      },
      hook_state_definition: {
        key: [
          {
            type: 'VarString',
            name: 'Empty',
            pattern: null,
            binary: true,
            byte_length: 30,
          },
          {
            type: 'VarString',
            name: 'Member Count',
            byte_length: 2,
            pattern: 'MC',
          },
        ],
        data: [
          {
            type: 'UInt8',
            name: 'Count',
            field: 'count',
          },
        ],
      },
    },
  },
} satisfies OperationDefinition

describe('writeOperation', () => {
  it('', () => {
    const wop = writeOperation(operationDefinition)
    expect(wop).toHaveProperty('voteToSeat')
  })
})

describe('readOperation', () => {
  it('', () => {
    const rop = readOperation(operationDefinition, 'account', 'namespace_id')
    expect(rop).toHaveProperty('currentMemberCount')
  })
})
