import React from 'react';
import { useLoader } from 'react-three-fiber';
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({ url, textures: textureUrls }) => {
  const gltf = useLoader(GLTFLoader, url)
  // const textures = useLoader(TextureLoader, textureUrls);
  return <primitive object={gltf.scene} />
}

export default Model;
