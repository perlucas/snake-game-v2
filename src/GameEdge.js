import { Types } from "./configs";
import DrawnBlock from "./DrawnBlock";

class GameEdge extends DrawnBlock
{
    getTypeId() {
        return Types.GAME_EDGE;
    }
}

export default GameEdge;