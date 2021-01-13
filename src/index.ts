import type { Transform } from 'stream';
import { obj as through } from 'through2';
import { basename, extname } from 'path';

/**
 * Describes the name transform.
 */
export interface NameTransform {

	/**
	 * A transform which applies custom chuck names to files.
	 *
	 * @param this - The instance of the current {@link https://nodejs.org/api/stream.html#stream_class_stream_transform | `stream`} transform.
	 * @param file - The current file being acted upon.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-invalid-void-type
	(this: Transform, file: any): string | void;

}

/**
 * Give files arbitrary chuck names.
 *
 * @param transform - The transform which applies custom chuck names to files.
 */
export default function (transform?: NameTransform): Transform {

	return through(function (this, file, _enc, callback) {

		if (transform) {
			const result = transform.call(this, file);

			if (result) {
				file.named = result;
				this.push(file);
			}
		}

		else {
			file.named = basename(file.path, extname(file.path));
			this.push(file);
		}

		callback();

	});

}
