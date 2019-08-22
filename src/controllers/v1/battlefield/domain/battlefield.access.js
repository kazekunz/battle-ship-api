import battlefieldRepository from '../../../../models/battlefield.repository'

export const getBattlefield = async () => {
    const battlefield = await battlefieldRepository.find({})
    return battlefield
}

export const createBattlefield = async () => {
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            await battlefieldRepository.create({
                name: `X${i}Y${j}`,
                status: 'AVAILABLE',
                coordinate: {
                    X: i,
                    Y: j,
                },
                owner: null,
            })
        }
    }
    return {
        create: 'success',
    }
}
