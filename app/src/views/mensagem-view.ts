
import { escapar } from '../decorators/escapar.js';
import { View } from './view.js';

export class MensagemView extends View<string> {

    @escapar
    protected template(model: string): string {
        return `
            <p class="alert alert-info">${model}</p>
        `
    }
}