import React, { Suspense, useRef } from 'react';
import { render } from 'react-dom';
import { Canvas, useFrame } from 'react-three-fiber';
import Model from './common/Model';

const Loading = () => {
  const ref = useRef()
  useFrame(() => (ref.current.rotation.z += 0.01))
  return (
    <mesh
      ref={ref}
      onClick={e => console.log('click')}
      onPointerOver={e => console.log('hover')}
      onPointerOut={e => console.log('unhover')}>
      <planeBufferGeometry attach="geometry" args={[1, 1]} />
      <meshBasicMaterial attach="material" color="hotpink" opacity={0.5} transparent />
    </mesh>
  )
}

const Thing = () => {
  return (
    <Suspense fallback={<Loading />}>
      <scene>
        <Model
          url="/assets/house/scene.gltf"
          textures={React.useMemo(() => [
            '/assets/house/textures/Brick_Antique_01_1_baseColor.jpeg',
            '/assets/house/textures/Brick_Antique_baseColor.jpeg',
            '/assets/house/textures/Buddleia_davidii_Black_Knight_2_baseColor.png',
            '/assets/house/textures/Fieldstone___Bronze_Mist_baseColor.jpeg',
            '/assets/house/textures/Grass_baseColor.jpeg',
            '/assets/house/textures/Polished_Concrete_New_baseColor.jpeg',
            '/assets/house/textures/Roofing_Shingles_Asphalt_3_baseColor.jpeg',
            '/assets/house/textures/Wood_Floor_1_baseColor.jpeg',
          ])}
        />
      </scene>
    </Suspense>
  );
}

render(<Canvas><Thing /></Canvas>, document.getElementById('root'));
