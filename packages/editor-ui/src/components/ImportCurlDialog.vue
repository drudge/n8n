<template>
	<div v-if="dialogVisible">
		<el-dialog :visible="dialogVisible" append-to-body width="80%" :title="$locale.baseText('nodeSettings.importCurlCommandLabel')" :before-close="closeDialog">

			<div class="ignore-key-press">
				<n8n-input-label :label="$locale.baseText('nodeSettings.importCurlCommand')">
					<div @keydown.stop @keydown.esc="onKeyDownEsc()">
						<n8n-input v-model="tempValue" type="textarea" ref="inputField" :value="value" placeholder="curl https://api.test.com -u 'user:password'" @change="valueChanged" @keydown.stop="noOp" :rows="15" />
					</div>
				</n8n-input-label>
			</div>

			<div slot="footer" class="dialog-footer"  style="align-self:right">
				<div style="float:left">
					<n8n-link to="https://everything.curl.dev/usingcurl/copyas">
						<span>Open docs</span>&nbsp;
						<span>
							<font-awesome-icon
								class="external"
								icon="external-link-alt"
								title="Open docs"
							/>
						</span>
					</n8n-link>
				</div>
				<n8n-button
					@click="importCurlCommand"
					:label="$locale.baseText('nodeSettings.importCurlCommandButton')"
				/>
			</div>

		</el-dialog>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

// import curlconverter from '@drudge/curlconverter';


export default Vue.extend({
	name: 'ImportCurlDialog',
	props: [
		'dialogVisible',
		'value',
	],
	data () {
		return {
			tempValue: '', // el-input does not seem to work without v-model so add one
		};
	},
	methods: {
		valueChanged (value: string) {
			this.$emit('valueChanged', value);
		},

		onKeyDownEsc () {
			// Resetting input value when closing the dialog, required when closing it using the `Esc` key
			this.tempValue = this.value;

			this.closeDialog();
		},

		closeDialog () {
			// Handle the close externally as the visible parameter is an external prop
			// and is so not allowed to be changed here.
			this.$emit('closeDialog');
			return false;
		},

		async importCurlCommand () {
			// TODO: convert curl. if errors, show them in the dialog
			//const result = await curlconverter.toN8n(this.tempValue);
			// if no errors, emit the converted command and close the dialog
			//console.log(result);
			//this.$emit('import', result);
			return this.closeDialog();
		},
	},
	mounted () {
		this.tempValue = this.value as string;
	},
	watch: {
		dialogVisible () {
			if (this.dialogVisible === true) {
				Vue.nextTick(() => {
					(this.$refs.inputField as HTMLInputElement).focus();
				});
			}
		},
		value () {
			this.tempValue = this.value as string;
		},
	},
});
</script>
