import _ from "lodash";

import "./styles.css";

/**
 * Split an array into `count` chunks.
 * @param arr
 * @param count
 */
const split = (arr: any[], count: number) => {
	const chunks = Array.from({ length: count }, () => new Array());
	arr.forEach((item, index) => {
		chunks[index % count].push(item);
	});
	return chunks;
};

document.addEventListener("DOMContentLoaded", () => {
	fetch(
		"https://e621.net/posts.json?tags=order:random%20loona_(helluva_boss)%20favcount:%3E200%20solo%20rating:s"
	)
		.then((response) => response.json())
		.then((data) => {
			const chunks = split(data.posts, 8);

			chunks.forEach((post) => {
				const column = document.createElement("div");
				column.classList.add("column");
				post.forEach((post) => {
					const previewImage = document.createElement("img");
					previewImage.src = post.preview.url;
					previewImage.className += "blurred";
					previewImage.width = post.file.width;
					previewImage.height = post.file.height;

					const fullImage = document.createElement("img");
					fullImage.src = post.file.url;
					fullImage.className += "hidden";

					fullImage.onload = () => {
						previewImage.classList.add("hidden");
						fullImage.classList.remove("hidden");
					};
					fullImage.onclick = () => {
						document.location = `https://e621.net/posts/${post.id}`;
					};

					column.appendChild(previewImage);
					column.appendChild(fullImage);
				});
				document.querySelector("#app")!.appendChild(column);
			});
		});
});
