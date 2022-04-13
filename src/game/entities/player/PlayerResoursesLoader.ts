import { Animator } from "../../graphics/Animator";
import { ResourceManager } from "../../media/ResourceManager";
import { animations } from "../../resources/ImageResourses";
import { PlayerAnimation } from "./PlayerAnimation";

export class PlayerResoursesLoader {
    static async loadAnimation(): Promise<Animator<PlayerAnimation>> {
        const [idle, run, jump, smrslt, crnrJmp, fall, wallSlide, crouch, crouchWalk, punch, walk, slide, slideStand] = await Promise.all([
            ResourceManager.loadAnimation(animations.idle),
            ResourceManager.loadAnimation(animations.run),
            ResourceManager.loadAnimation(animations.jump),
            ResourceManager.loadAnimation(animations.smrslt),
            ResourceManager.loadAnimation(animations.crnrJmp),
            ResourceManager.loadAnimation(animations.fall),
            ResourceManager.loadAnimation(animations.wallSlide),
            ResourceManager.loadAnimation(animations.crouch),
            ResourceManager.loadAnimation(animations.crouchWalk),
            ResourceManager.loadAnimation(animations.punch),
            ResourceManager.loadAnimation(animations.walk),
            ResourceManager.loadAnimation(animations.slide),
            ResourceManager.loadAnimation(animations.slideStand)
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
        animator.addAnimation(PlayerAnimation.crouch, crouch);
        animator.addAnimation(PlayerAnimation.crouchWalk, crouchWalk);
        animator.addAnimation(PlayerAnimation.punch, punch);
        animator.addAnimation(PlayerAnimation.walk, walk);
        animator.addAnimation(PlayerAnimation.slide, slide);
        animator.addAnimation(PlayerAnimation.slideStand, slideStand);
        animator.changeAnimation(PlayerAnimation.idle);

        return animator;
    }
} 