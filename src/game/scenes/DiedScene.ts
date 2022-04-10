import AbstractScene from "../core/scene/AbstractScene";
import { Renderer } from "../graphics/Renderer";
import { Texture } from "../graphics/Texture";
import { GamepadButtonCodes } from "../input/gamepad/GamepadButtonCodes";
import { EffectTypes, GamePadController } from "../input/gamepad/GamePadController";
import { GamePadsManager } from "../input/gamepad/GamepadsManager";
import { Keyboard } from "../input/keyboard/Keyboard";
import { KeyCode } from "../input/keyboard/KeyCode";
import { MathUtil } from "../math/MathUtil";
import { ResourceManager } from "../media/ResourceManager";
import { Sound } from "../Sound";
import { SceneType } from "./SceneType";

const TEXT_TIMEOUT = 300;
const SHADOW_TIMEOUT = 6000;

export default class DiedScene extends AbstractScene {
    text: Texture;
    textColor: string; 
    switchTimeout: number;
    showPress: boolean;
    shadowTimeout: number;
    sound: Sound;
    gamepadController?: GamePadController;

    async init(): Promise<void> {
        this.switchTimeout = TEXT_TIMEOUT;
        this.shadowTimeout = SHADOW_TIMEOUT;
        this.text = await ResourceManager.loadTexture('assets/images/died.jpg');
        this.sound = await ResourceManager.loadSound('assets/sounds/you-died.mp3');
        this.sound.play();
        this.gamepadController = GamePadsManager.instance.gamepads.get(0);
    }

    public update(deltaTime: number): void {
        super.update(deltaTime);
        
        if (this.showPress) {
            this.switchTimeout -= deltaTime;

            if(this.switchTimeout < -TEXT_TIMEOUT) {
                this.switchTimeout = TEXT_TIMEOUT;
            }

            if (this.gamepadController?.isClicked(GamepadButtonCodes.keyA) || Keyboard.instance.isPressed(KeyCode.space)) {
                this.manager.setScene(SceneType.level);
            }
        } else {
            this.shadowTimeout -= deltaTime;

            if(this.shadowTimeout < 0) {
                this.showPress = true;
                this.shadowTimeout = 0;
            }
            this.gamepadController?.playEffect(EffectTypes.DualRumble, {duration: deltaTime, startDelay: 0, strongMagnitude: 1, weakMagnitude: 1});
        }
    }

    public draw(renderer: Renderer): void {
        const alpha = MathUtil.lerp(1, 0, 1 - Math.abs(this.shadowTimeout) / SHADOW_TIMEOUT);
        renderer.camera.scale = 1;
        renderer.camera.setCenter(0, 0);
        super.draw(renderer);
        renderer.fillRect(0, 0, renderer.width, renderer.height, 'black');
        renderer.renderTexture(
            this.text,
            (renderer.width - this.text.width) / 2,
            (renderer.height - this.text.height) / 2,
        );
        renderer.fillRect(
            0,
            0,
            renderer.width,
            renderer.height,
            `rgba(0, 0, 0, ${alpha})`
        );

        if(this.showPress) {
            const text = this.gamepadController ? 'Press A to restart' : 'Press space to restart';
            const alpha = MathUtil.lerp(0, 1, Math.abs(this.switchTimeout) / TEXT_TIMEOUT);
            renderer.drawText(
                text,
                renderer.width / 2 - 125,
                renderer.height - renderer.height / 4,
                `rgba(255, 255, 255, ${alpha})`,
                'bold 24px serif'
            );
        }
    }
}