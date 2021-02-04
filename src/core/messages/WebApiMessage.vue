<template>
    <div v-if="messages.length > 0">
        <slot :messages="messages">
            <ul class="text-red-500 text-10 font-bold">
                <li v-for="(message, ix) in messages" :key="ix" class="my-5">
                    {{ message.message }}
                </li>
            </ul>
        </slot>
    </div>
</template>

<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import bus from '../bus';
import { ClientMessage, ValidationErrorEvent } from '@/core/messages/types';
import { BusConstants } from '../constants';

@Component
export default class WebApiMessage extends Vue {
    private messages: ClientMessage[] = [];

    @Prop({
        required: true
    })
    private id!: string;

    private created() {
        bus.on(BusConstants.ValidationErrorEventKey, this.onMessages);
    }

    private onMessages(validationErrorEvent: ValidationErrorEvent) {
        if (validationErrorEvent.messagesId === this.id) {
            this.messages = validationErrorEvent.messages;
            validationErrorEvent.handled();
        }
    }

    private destroyed() {
        bus.off(BusConstants.ValidationErrorEventKey, this.onMessages);
    }
}
</script>
