import { Text3D, Center, useTexture } from "@react-three/drei";
import { useControls, button } from 'leva'
import { useState } from "react";


const TextGenerator = ({ text }) => {

  let matcap1 = useTexture('/matcap1.png')
  let matcap2 = useTexture('/matcap2.png')
  let matcap3 = useTexture('/matcap3.png')
  let matcap4 = useTexture('/matcap4.png')
  let matcap5 = useTexture('/matcap5.png')
  let matcap6 = useTexture('/matcap6.png')

  const materials = ["PhysicalMaterial", "Matcap1", "Matcap2", "Matcap3", "Matcap4", "Matcap5", "Matcap6"];
  const [selectedMat, setSelectedMat] = useState("PhysicalMaterial");
  
  useControls({
    Materials: {
      options: [...materials],
      onChange: (value) => {
        setSelectedMat(value);
      },
    }
  });

  const PMC = useControls(
    "Physical Material Controls", 
    () => {
      let res = {
        color: "white",
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        metalness: { value: 0.5, min: 0, max: 1, step: 0.1 },
        clearcoat: { value: 1, min: 0, max: 1, step: 0.1 },
        clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.1 },
      }
      return res;
    }
  )

  useControls({
    screenshot: button(() => {
      // Create a new link element
      const link = document.createElement('a')
  
      // Set the download attribute of the link to "canvas.png"
      link.setAttribute('download', 'canvas.png')
  
      // Replacing 'image/png' with 'image/octet-stream'
      // Makes the browser download the image file instead of showing it in a new tab
      link.setAttribute('href', document.querySelector('canvas').toDataURL('image/octet-stream'))
  
      // Trigger a click on the link to start the download
      link.click()
    })
  });
  

  const mat = () => {
    if (selectedMat === "PhysicalMaterial"){
      return <meshPhysicalMaterial 
              color={PMC[0].color}
              clearcoat={PMC[0].clearcoat}
              clearcoatRoughness={PMC[0].clearcoatRoughness}
              roughness={PMC[0].roughness}
              metalness={PMC[0].metalness}
              />
    }
    else if (selectedMat === "Matcap1")
      return <meshMatcapMaterial matcap={matcap1} />
    else if (selectedMat === "Matcap2")
      return <meshMatcapMaterial matcap={matcap2} />
    else if (selectedMat === "Matcap3")
      return <meshMatcapMaterial matcap={matcap3} />
    else if (selectedMat === "Matcap4")
      return <meshMatcapMaterial matcap={matcap4} />
    else if (selectedMat === "Matcap5")
      return <meshMatcapMaterial matcap={matcap5} />
    else if (selectedMat === "Matcap6")
      return <meshMatcapMaterial matcap={matcap6} />

    return <meshNormalMaterial />
  }
    
      return (
        <>
          <Center>
              <Text3D
                  castShadow
                  bevelEnabled
                  font={'/Roboto Medium_Regular.json'}
                  scale={5}
                  letterSpacing={-0.02}
                  height={0.25}
                  bevelSize={0.01}
                  bevelSegments={10}
                  curveSegments={128}
                  bevelThickness={0.01}>
                  {mat()}
                  {text}
              </Text3D>
            </Center>
        </>
      );
    };
  
  export default TextGenerator;