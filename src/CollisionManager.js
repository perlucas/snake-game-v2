class CollisionManager {
    constructor() {
        this.movables = [];
        this.collidables = [];
        this.listeners = [];
    }

    detectCollisions() {
        this.movables.forEach(movable => {
            this.collidables.forEach(collidable => {
                if (this.hasCollision(movable, collidable)) {
                    this.emitCollisionEvent(movable, collidable);
                }
            })
        });
    }

    registerMovableBlock(movable) {
        this.movables.push(movable);
    }

    registerCollidableBlock(collidable) {
        this.collidables.push(collidable);
    }

    unregisterCollidableBlock(collidable) {
        this.collidables = this.collidables.filter(block => block != collidable);
    }

    registerCollisionListener(listener, eventType) {
        let listenersByEvent = this.listeners.find(listenersObject => listenersObject.eventType === eventType);
        if (!listenersByEvent) {
            listenersByEvent = {
                eventType,
                listeners: []
            };
            this.listeners.push(listenersByEvent);
        }
        listenersByEvent.listeners.push(listener)
    }

    hasCollision(movable, collidable) {
        if (movable == collidable) {
            return false;
        }
        return this.blocksAreIntersecting(movable, collidable);
    }

    blocksAreIntersecting(first, second) {
        if (first.getX() == second.getX() && first.getY() == second.getY()) {
            return true;
        }

        const intersectsInX = (first, second) => first.getX() < second.getX() && 
            second.getX() < first.getX() + first.getWidth();

        const intersectsInY = (first, second) => first.getY() < second.getY() && 
            second.getY() < first.getY() + first.getHeight();
        
        const hasSomeIntersectionInXAxe = intersectsInX(first, second) || intersectsInX(second, first);
        const hasSomeIntersectionInYAxe = intersectsInY(first, second) || intersectsInY(second, first);

        const blocksAreInSameColumn = first.getWidth() == second.getWidth() &&
            first.getX() == second.getX();
        
        const blocksAreInSameRow = first.getHeight() == second.getHeight() &&
            first.getY() == second.getY();
        

        return (blocksAreInSameColumn && hasSomeIntersectionInYAxe) ||
            (blocksAreInSameRow && hasSomeIntersectionInXAxe) ||
            (hasSomeIntersectionInXAxe && hasSomeIntersectionInYAxe);
    }

    emitCollisionEvent(movable, collidable) {
        const event = {
            eventType: `COLLISION_${movable.getTypeId()}_${collidable.getTypeId()}`,
            movable,
            collidable
        };
        console.log('emmited collision event!')
        console.info(event);
        const eventListeners = this.listeners.find(listenerObject => listenerObject.eventType === event.eventType);
        if (eventListeners) {
            eventListeners.listeners.forEach(listener => listener.notifyCollision(event));
        }
    }
}

export default CollisionManager;