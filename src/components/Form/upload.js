import React, { useEffect, useState, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { GlobalContext } from '../../context/GlobalState';

const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16,
};

const thumb = {
	display: 'inline-flex',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	marginBottom: 8,
	marginRight: 8,
	width: 100,
	height: 100,
	padding: 4,
	boxSizing: 'border-box',
};

const thumbInner = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden',
};

const img = {
	display: 'block',
	width: 'auto',
	height: '100%',
};

export default function Upload({ name, error, isSuccess }) {
	const { handleInput } = useContext(GlobalContext);
	const [files, setFiles] = useState([]);
	if (isSuccess) files.pop();

	function TypeValidator(file) {
		files.map((va) => {
			const match = ['image/png', 'image/jpeg', 'image/jpg'];
			if (match.indexOf(va.type) === -1) {
				return {
					code: 'file-invalid-type',
					message: `type file is not allowed`,
				};
			}
			return null;
		});
		return null;
	}

	const { getRootProps, getInputProps, fileRejections } = useDropzone({
		accept: '.png, .jpeg, .jpg',
		validator: TypeValidator,
		onDrop: (acceptedFiles) => {
			handleInput(
				name,
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					}),
				),
			);
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					}),
				),
			);
		},
		multiple: name !== 'foto_pemilik',
	});
	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files],
	);

	const fileRejectionItems = fileRejections.map(({ file, errors }) => (
		<div>
			<small className='text-sm text-red-500 italic mr-1' key={file.path}>
				{file.path}
			</small>
			{errors.map((e) => (
				<small className='text-sm text-red-500 italic'>
					{e.code} {e.message}
				</small>
			))}
		</div>
	));
	const remove = (file) => {
		const newFiles = [...files]; // make a var for the new array
		newFiles.splice(file, 1); // remove the file from the array
		setFiles(newFiles);
	};

	const thumbs = files.map((file, i) => (
		<div className='flex' key={file.name}>
			<div style={thumb}>
				<div style={thumbInner}>
					<img src={file.preview} style={img} alt={file.name} />
				</div>
			</div>
			<i
				className='fa fa-trash text-red-500'
				onClick={() => remove(i)}
				onKeyPress={() => remove(i)}
				role='button'
				aria-hidden='true'
			/>
		</div>
	));

	function getFieldError(field) {
		return !!error[field];
	}

	function getMessageError(field) {
		return (
			<>
				{getFieldError(field) ? (
					<small className='text-sm text-red-500 italic'>
						{error[field][0]}
					</small>
				) : null}
			</>
		);
	}
	const label = name.split('_').join(' ');
	return (
		<div className='mb-3 pt-0 w-1/2 px-4'>
			<section className='container'>
				<label
					htmlFor={name}
					className='capitalize text-semibold text-base text-gray-300'
				>
					{label}
				</label>
				<div
					{...getRootProps({
						className: `bg-soft-dark focus:outline-none dropzone mt-2 rounded-lg h-24 flex items-center justify-center px-4 shadow-xl text-sm
          ${getFieldError(name) ? 'border border-red-500' : 'text-gray-300'}`,
					})}
				>
					<input name={name} {...getInputProps()} />
					<p>Drag & drop some files here, or click to select files</p>
				</div>
				{getMessageError(name)}
				<aside style={thumbsContainer}>{thumbs}</aside>
				<ul>{fileRejectionItems}</ul>
			</section>
		</div>
	);
}
