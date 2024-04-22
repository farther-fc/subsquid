export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_factory"
            },
            {
                "type": "address",
                "name": "_nonfungiblePositionManager"
            },
            {
                "type": "uint256",
                "name": "_maxIncentiveStartLeadTime"
            },
            {
                "type": "uint256",
                "name": "_maxIncentiveDuration"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "DepositTransferred",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": true
            },
            {
                "type": "address",
                "name": "oldOwner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newOwner",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "IncentiveCreated",
        "inputs": [
            {
                "type": "address",
                "name": "rewardToken",
                "indexed": true
            },
            {
                "type": "address",
                "name": "pool",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "startTime",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "endTime",
                "indexed": false
            },
            {
                "type": "address",
                "name": "refundee",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "reward",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "IncentiveEnded",
        "inputs": [
            {
                "type": "bytes32",
                "name": "incentiveId",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "refund",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "RewardClaimed",
        "inputs": [
            {
                "type": "address",
                "name": "to",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "reward",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "TokenStaked",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": true
            },
            {
                "type": "bytes32",
                "name": "incentiveId",
                "indexed": true
            },
            {
                "type": "uint128",
                "name": "liquidity",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "TokenUnstaked",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": true
            },
            {
                "type": "bytes32",
                "name": "incentiveId",
                "indexed": true
            }
        ]
    },
    {
        "type": "function",
        "name": "claimReward",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "rewardToken"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "amountRequested"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "reward"
            }
        ]
    },
    {
        "type": "function",
        "name": "createIncentive",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "tuple",
                "name": "key",
                "components": [
                    {
                        "type": "address",
                        "name": "rewardToken"
                    },
                    {
                        "type": "address",
                        "name": "pool"
                    },
                    {
                        "type": "uint256",
                        "name": "startTime"
                    },
                    {
                        "type": "uint256",
                        "name": "endTime"
                    },
                    {
                        "type": "address",
                        "name": "refundee"
                    }
                ]
            },
            {
                "type": "uint256",
                "name": "reward"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "deposits",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "owner"
            },
            {
                "type": "uint48",
                "name": "numberOfStakes"
            },
            {
                "type": "int24",
                "name": "tickLower"
            },
            {
                "type": "int24",
                "name": "tickUpper"
            }
        ]
    },
    {
        "type": "function",
        "name": "endIncentive",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "tuple",
                "name": "key",
                "components": [
                    {
                        "type": "address",
                        "name": "rewardToken"
                    },
                    {
                        "type": "address",
                        "name": "pool"
                    },
                    {
                        "type": "uint256",
                        "name": "startTime"
                    },
                    {
                        "type": "uint256",
                        "name": "endTime"
                    },
                    {
                        "type": "address",
                        "name": "refundee"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "refund"
            }
        ]
    },
    {
        "type": "function",
        "name": "factory",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getRewardInfo",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "tuple",
                "name": "key",
                "components": [
                    {
                        "type": "address",
                        "name": "rewardToken"
                    },
                    {
                        "type": "address",
                        "name": "pool"
                    },
                    {
                        "type": "uint256",
                        "name": "startTime"
                    },
                    {
                        "type": "uint256",
                        "name": "endTime"
                    },
                    {
                        "type": "address",
                        "name": "refundee"
                    }
                ]
            },
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "reward"
            },
            {
                "type": "uint160",
                "name": "secondsInsideX128"
            }
        ]
    },
    {
        "type": "function",
        "name": "incentives",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes32",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "totalRewardUnclaimed"
            },
            {
                "type": "uint160",
                "name": "totalSecondsClaimedX128"
            },
            {
                "type": "uint96",
                "name": "numberOfStakes"
            }
        ]
    },
    {
        "type": "function",
        "name": "maxIncentiveDuration",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "maxIncentiveStartLeadTime",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "multicall",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "bytes[]",
                "name": "data"
            }
        ],
        "outputs": [
            {
                "type": "bytes[]",
                "name": "results"
            }
        ]
    },
    {
        "type": "function",
        "name": "nonfungiblePositionManager",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "onERC721Received",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": ""
            },
            {
                "type": "address",
                "name": "from"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "bytes",
                "name": "data"
            }
        ],
        "outputs": [
            {
                "type": "bytes4",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "rewards",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": ""
            },
            {
                "type": "address",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "stakeToken",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "tuple",
                "name": "key",
                "components": [
                    {
                        "type": "address",
                        "name": "rewardToken"
                    },
                    {
                        "type": "address",
                        "name": "pool"
                    },
                    {
                        "type": "uint256",
                        "name": "startTime"
                    },
                    {
                        "type": "uint256",
                        "name": "endTime"
                    },
                    {
                        "type": "address",
                        "name": "refundee"
                    }
                ]
            },
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "stakes",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "bytes32",
                "name": "incentiveId"
            }
        ],
        "outputs": [
            {
                "type": "uint160",
                "name": "secondsPerLiquidityInsideInitialX128"
            },
            {
                "type": "uint128",
                "name": "liquidity"
            }
        ]
    },
    {
        "type": "function",
        "name": "transferDeposit",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "address",
                "name": "to"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "unstakeToken",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "tuple",
                "name": "key",
                "components": [
                    {
                        "type": "address",
                        "name": "rewardToken"
                    },
                    {
                        "type": "address",
                        "name": "pool"
                    },
                    {
                        "type": "uint256",
                        "name": "startTime"
                    },
                    {
                        "type": "uint256",
                        "name": "endTime"
                    },
                    {
                        "type": "address",
                        "name": "refundee"
                    }
                ]
            },
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "withdrawToken",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "bytes",
                "name": "data"
            }
        ],
        "outputs": []
    }
]
