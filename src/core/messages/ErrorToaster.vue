<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import { ClientMessage } from '@/core/messages/types';
import bus from '@/core/bus';
import { BusConstants } from '../constants';

const AUTO_KILL_TIME = 7000; // ms.

@Component
export default class ErrorToaster extends Vue {
    private messages: ClientMessage[] = [];

    public created() {
        bus.on(BusConstants.GeneralErrorEventKey, this.addMessages);
    }

    public addMessages(newMessages: ClientMessage[]): void {
        newMessages.forEach(msg => {
            setTimeout(() => this.clearMessage(msg), AUTO_KILL_TIME);

            this.$bvToast.toast(msg.message || 'Error', {
                variant: 'danger',
                solid: true
            });
        });
    }

    public clearMessage(msg: ClientMessage): void {
        this.messages = this.messages.filter(m => m !== msg);
    }
}
</script>
