interface Iuser {
    
}
export class User {
    constructor(user = {}) {
        const { id, nickname, avatar } = user
        this.id = id
        this.nickname = nickname
        this.avatar = avatar
    }
}