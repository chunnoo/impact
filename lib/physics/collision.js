function collision(objArr/*debug , ctx debug*/) {
  for (var i = 0; i < objArr.length; i++) {
    for (var j = i + 1; j < objArr.length; j++) {

      if (objArr[i].static && objArr[j].static) {
        continue;
      }

      var tmpCollision = objArr[i].collisionDetection(objArr[j]/*debug , ctx debug*/);

      if (tmpCollision) {
        var impactPoint = tmpCollision.xy();
        var impactNormal = tmpCollision.zw();

        var objA = objArr[i];
        var objB = objArr[j];
        if (!objArr[i].static && !objArr[j].static) {
          var velSizeA = objA.velocity.dot(impactNormal);
          var velSizeB = objB.velocity.dot(impactNormal);

          var newVelSizeA = (objA.mass*velSizeA + 2*objB.mass*velSizeB - objB.mass*velSizeA)/(objA.mass + objB.mass);
          var newVelSizeB = (objB.mass*velSizeB + 2*objA.mass*velSizeA - objA.mass*velSizeB)/(objA.mass + objB.mass);

          objA.velocity.translate(impactNormal.multiply(newVelSizeA - velSizeA));
          objB.velocity.translate(impactNormal.multiply(newVelSizeB - velSizeB));
        } else if (objArr[i].static && !objArr[j].static) {
          var velSizeA = objA.velocity.dot(impactNormal);
          var velSizeB = objB.velocity.dot(impactNormal);

          var newVelSizeB = (objB.mass*velSizeB + 2*objA.mass*velSizeA - objA.mass*velSizeB)/(objA.mass + objB.mass) - (objA.mass*velSizeA + 2*objB.mass*velSizeB - objB.mass*velSizeA)/(objA.mass + objB.mass);

          objB.velocity.translate(impactNormal.multiply(newVelSizeB - velSizeB));
        } else if (!objArr[i].static && objArr[j].static) {
          var velSizeA = objA.velocity.dot(impactNormal);
          var velSizeB = objB.velocity.dot(impactNormal);

          var newVelSizeA = (objA.mass*velSizeA + 2*objB.mass*velSizeB - objB.mass*velSizeA)/(objA.mass + objB.mass) - (objB.mass*velSizeB + 2*objA.mass*velSizeA - objA.mass*velSizeB)/(objA.mass + objB.mass);

          objA.velocity.translate(impactNormal.multiply(newVelSizeA - velSizeA));
        }
      }
    }
  }
}
