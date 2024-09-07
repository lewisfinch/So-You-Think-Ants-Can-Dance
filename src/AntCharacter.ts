/* Assignment 4: So You Think Ants Can Dance
 * UMN CSci-4611 Instructors 2012+
 * Significant changes by Prof. Dan Keefe, 2023 
 * Initial GopherGfx implementation by Evan Suma Rosenberg <suma@umn.edu> 2022
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * Please do not distribute beyond the CSci-4611 course
 */

import * as gfx from 'gophergfx'
import { AnimatedBone } from './AnimatedBone';
import { AnimatedCharacter } from './AnimatedCharacter'


/**
 * This character should draw an Ant or some other interesting custom 3D character by
 * adding geometry to the bones of the character.  We will assume the character's
 * skeleton is a humanoid skeleton in the CMU MoCap database format.  So, you can
 * selectively add geometry to the bone by checking the name of the bone using an
 * "if" statement as demonstrated in the support code.
 */
export class AntCharacter extends AnimatedCharacter {
    private blackMaterial: gfx.UnlitMaterial;
    private antMaterial: gfx.PhongMaterial;

    constructor() {
        super();

        this.blackMaterial = new gfx.UnlitMaterial();
        this.blackMaterial.setColor(gfx.Color.BLACK);

        this.antMaterial = new gfx.PhongMaterial();
        this.antMaterial.ambientColor.set(0.7, 0, 0);
        this.antMaterial.diffuseColor.set(0.7, 0, 0);
        this.antMaterial.specularColor.set(0.7, 0.7, 0.7);
        this.antMaterial.shininess = 50;
    }

    public override addGeometryToAnimatedBone(bone: AnimatedBone): void {
        // PART 5: Create an character!
        //
        // For this part, create a convincing custom character out of basic
        // geometries. Start by creating a basic representation for *every* bone
        // (like you did in the SkeletonCharacter), and add additional
        // geometries for specific parts of the skeleton. We suggest drawing
        // geometries for at least the following parts (defined in the if
        // statement below):
        // - lowerback
        // - upperbackback
        // - thorax
        // - head
        //
        // A full list of available bones (and their hierarchical relationships)
        // can be seen in the skeleton files, for example /public/assets/data/05.asf.
        //
        // Lastly, add a face to the character! The character's face should
        // demonstrate your knowledge of composing transformations; at least one
        // part of the face should adjust the position, the rotation, and the
        // scale (like the horn on the instructor solution).

        // PART 5.1: Draw specific parts of the character
        // if (bone.name == 'lowerback')
        // {
        // }
        // else if (bone.name == 'upperback')
        // {
        // }
        // else if (bone.name == 'thorax')
        // {
        // }
        // else if (bone.name == 'head')
        // {
        //     // PART 5.2: Add a face to the character
        // }

        const len = bone.length;
        const cylinder = gfx.Geometry3Factory.createCylinder(20, 0.01, len);
        cylinder.material = this.blackMaterial;

        const boneTranslationMatrix = gfx.Matrix4.makeTranslation((new gfx.Vector3(0, bone.length / 2, 0)));
        const boneRotationMatrix = gfx.Matrix4.makeAlign(gfx.Vector3.UP, bone.direction);
        const matrix = gfx.Matrix4.multiplyAll(boneRotationMatrix, boneTranslationMatrix);

        cylinder.setLocalToParentMatrix(matrix, true);

        bone.add(cylinder);

        if (bone.name === 'lowerback') {
            // Add geometry for the lowerback bone
            const lowerBackGeometry = gfx.Geometry3Factory.createSphere(0.15);
            lowerBackGeometry.material = this.antMaterial;
            const lbTranslationMatrix = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, -0.12, 0));
            const lbScaleMatrix = gfx.Matrix4.makeScale(new gfx.Vector3(1, 2, 1));
            const lbRotationMatrix = gfx.Matrix4.makeRotationX(Math.PI / 6);
            const lb = gfx.Matrix4.multiplyAll(lbRotationMatrix, lbScaleMatrix, lbTranslationMatrix);
            lowerBackGeometry.setLocalToParentMatrix(lb, false);
            bone.add(lowerBackGeometry);
        } else if (bone.name === 'upperback') {
            // Add geometry for the upperback bone
            const upperBackGeometry = gfx.Geometry3Factory.createSphere(0.1);
            upperBackGeometry.material = this.antMaterial;
            const ubTranslationMatrix = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, 0));
            upperBackGeometry.setLocalToParentMatrix(ubTranslationMatrix, false);
            bone.add(upperBackGeometry);
        } else if (bone.name === 'thorax') {
            // Add geometry for the thorax bone
            const thoraxGeometry = gfx.Geometry3Factory.createSphere(0.1);
            thoraxGeometry.material = this.antMaterial;
            const thTranslationMatrix = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0.05, 0));
            thoraxGeometry.setLocalToParentMatrix(thTranslationMatrix, false);
            bone.add(thoraxGeometry);
        } else if (bone.name === 'head') {
            // Add geometry for the head bone
            const headGeometry = gfx.Geometry3Factory.createSphere(0.2);
            headGeometry.material = this.antMaterial;
            const headTranslationMatrix = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, -0.05, 0.2));
            const headScaleMatrix = gfx.Matrix4.makeScale(new gfx.Vector3(0.5, 1, 0.5));
            const headRotationMatrix = gfx.Matrix4.makeRotationX(-Math.PI / 6);
            const head = gfx.Matrix4.multiplyAll(headRotationMatrix, headScaleMatrix, headTranslationMatrix);
            headGeometry.setLocalToParentMatrix(head, false);
            bone.add(headGeometry);

            // PART 5.2: Add a face to the character
            // For example, add horn to the head bone
            const eyeGeometry1 = gfx.Geometry3Factory.createSphere(0.02);
            eyeGeometry1.position = new gfx.Vector3();
            eyeGeometry1.material = this.blackMaterial;
            const eyeBone1 = new AnimatedBone(this, 'eye1', gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, 0)));
            const boneTranslationMatrix1 = gfx.Matrix4.makeTranslation(new gfx.Vector3(0.05, 0.05, 0.2));
            eyeBone1.setLocalToParentMatrix(boneTranslationMatrix1, false);
            eyeBone1.add(eyeGeometry1);
            headGeometry.add(eyeBone1);

            const eyeGeometry2 = gfx.Geometry3Factory.createSphere(0.02);
            eyeGeometry2.material = this.blackMaterial;
            const eyeBone2 = new AnimatedBone(this, 'eye2', gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, 0)));
            const boneTranslationMatrix2 = gfx.Matrix4.makeTranslation(new gfx.Vector3(-0.05, 0.05, 0.2));
            eyeBone2.setLocalToParentMatrix(boneTranslationMatrix2, false);
            eyeBone2.add(eyeGeometry2);
            headGeometry.add(eyeBone2);

            const mouthGeometry3 = gfx.Geometry3Factory.createBox(0.1, 0.01, 0.05);
            mouthGeometry3.material = this.blackMaterial;
            const mouthBone3 = new AnimatedBone(this, 'mouth', gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, 0)));
            const boneTranslationMatrix3 = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, -0.05, 0.18));
            mouthBone3.setLocalToParentMatrix(boneTranslationMatrix3, false);
            mouthBone3.add(mouthGeometry3);
            headGeometry.add(mouthBone3);

            const mouthGeometry31 = gfx.Geometry3Factory.createBox(0.05, 0.01, 0.05);
            mouthGeometry31.material = this.blackMaterial;
            const mouthBone31 = new AnimatedBone(this, 'mouth1', gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, 0)));
            const boneTranslationMatrix31 = gfx.Matrix4.makeTranslation(new gfx.Vector3(-0.05, -0.04, 0.18));
            mouthBone31.setLocalToParentMatrix(boneTranslationMatrix31, false);
            mouthBone31.add(mouthGeometry31);
            headGeometry.add(mouthBone31);

            const mouthGeometry32 = gfx.Geometry3Factory.createBox(0.05, 0.01, 0.05);
            mouthGeometry32.material = this.blackMaterial;
            const mouthBone32 = new AnimatedBone(this, 'mouth2', gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, 0)));
            const boneTranslationMatrix32 = gfx.Matrix4.makeTranslation(new gfx.Vector3(0.05, -0.04, 0.18));
            mouthBone32.setLocalToParentMatrix(boneTranslationMatrix32, false);
            mouthBone32.add(mouthGeometry32);
            headGeometry.add(mouthBone32);

            const hornGeometry4 = gfx.Geometry3Factory.createCone(0.05, 0.1, 20);
            hornGeometry4.position = new gfx.Vector3(0.1, 0.2, 0);
            hornGeometry4.material = this.antMaterial;
            const hornBone4 = new AnimatedBone(this, 'horn1', gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, 0)));
            const boneTranslationMatrix4 = gfx.Matrix4.makeTranslation(new gfx.Vector3(-0.05, 0.05, 0));
            const boneRotationMatrix4 = gfx.Matrix4.makeRotationZ(-0.5);
            const matrix4 = gfx.Matrix4.multiplyAll(boneTranslationMatrix4, boneRotationMatrix4);
            hornBone4.setLocalToParentMatrix(matrix4, false);
            hornBone4.add(hornGeometry4);
            headGeometry.add(hornBone4);

            const hornGeometry5 = gfx.Geometry3Factory.createCone(0.05, 0.1, 20);
            hornGeometry5.position = new gfx.Vector3(-0.1, 0.2, 0);
            hornGeometry5.material = this.antMaterial;
            const hornBone5 = new AnimatedBone(this, 'horn2', gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, 0)));
            const boneTranslationMatrix5 = gfx.Matrix4.makeTranslation(new gfx.Vector3(0.05, 0.05, 0));
            const boneRotationMatrix5 = gfx.Matrix4.makeRotationZ(0.5);
            const matrix5 = gfx.Matrix4.multiplyAll(boneTranslationMatrix5, boneRotationMatrix5);
            hornBone5.setLocalToParentMatrix(matrix5, false);
            hornBone5.add(hornGeometry5);
            headGeometry.add(hornBone5);

            const hornGeometry6 = gfx.Geometry3Factory.createSphere(0.05);
            hornGeometry6.position = new gfx.Vector3(0.1, 0.2, 0);
            hornGeometry6.material = this.antMaterial;
            const hornBone6 = new AnimatedBone(this, 'horn3', gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, 0)));
            const boneTranslationMatrix6 = gfx.Matrix4.makeTranslation(new gfx.Vector3(-0.25, 0.23, -0.18));
            const boneRotationMatrix6 = gfx.Matrix4.makeRotationX(Math.PI / 2);
            const matrix6 = gfx.Matrix4.multiplyAll(boneTranslationMatrix6, boneRotationMatrix6);
            hornBone6.setLocalToParentMatrix(matrix6, false);
            hornBone6.add(hornGeometry6);
            headGeometry.add(hornBone6);

            const hornGeometry7 = gfx.Geometry3Factory.createSphere(0.05);
            hornGeometry7.position = new gfx.Vector3(-0.1, 0.2, 0);
            hornGeometry7.material = this.antMaterial;
            const hornBone7 = new AnimatedBone(this, 'horn4', gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, 0)));
            const boneTranslationMatrix7 = gfx.Matrix4.makeTranslation(new gfx.Vector3(0.25, 0.23, -0.18));
            const boneRotationMatrix7 = gfx.Matrix4.makeRotationX(Math.PI / 2);
            const matrix7 = gfx.Matrix4.multiplyAll(boneTranslationMatrix7, boneRotationMatrix7);
            hornBone7.setLocalToParentMatrix(matrix7, false);
            hornBone7.add(hornGeometry7);
            headGeometry.add(hornBone7);
        }

    }
}
