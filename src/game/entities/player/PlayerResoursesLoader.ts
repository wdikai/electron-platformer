import { Animator } from "../../graphics/Animator";
import { ResourceManager } from "../../media/ResourceManager";
import { animations } from "../../resources/ImageResourses";
import { PlayerAnimation } from "./PlayerAnimation";

export class PlayerResoursesLoader {
    static async loadAnimation(): Promise<Animator<PlayerAnimation>> {
        const [idle, run, jump, smrslt, crnrJmp, fall, wallSlide] = await Promise.all([
            ResourceManager.loadAnimation(animations.idle),
            ResourceManager.loadAnimation(animations.run),
            ResourceManager.loadAnimation(animations.jump),
            ResourceManager.loadAnimation(animations.smrslt),
            ResourceManager.loadAnimation(animations.crnrJmp),
            ResourceManager.loadAnimation(animations.fall),
            ResourceManager.loadAnimation(animations.wallSlide)
        ]);

        const animator = new Animator<PlayerAnimation>();
        animator.addAnimation(PlayerAnimation.run, run);
        animator.addAnimation(PlayerAnimation.idle, idle);
        animator.addAnimation(PlayerAnimation.jump, jump);
        animator.addAnimation(PlayerAnimation.smrslt, smrslt);
        animator.addAnimation(PlayerAnimation.crnrJmp, crnrJmp);
        animator.addAnimation(PlayerAnimation.fall, fall);
        animator.addAnimation(PlayerAnimation.wallSlide, wallSlide);
        animator.addAnimation(PlayerAnimation.dash, crnrJmp);
        animator.changeAnimation(PlayerAnimation.idle);

        return animator;
    }
} 