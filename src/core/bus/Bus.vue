<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Bus extends Vue {
    public emit(event: string, ...args: any[]) {
        this.$emit(event, ...args);
    }

    public once(event: string, callback: (...args: any[]) => void) {
        this.$once(event, callback);
    }

    public on(event: string, callback: (...args: any[]) => void) {
        this.$on(event, callback);
    }

    public off(event: string, callback: (...args: any[]) => void) {
        this.$off(event, callback);
    }
}
</script>
