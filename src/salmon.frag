#version 330 compatibility

uniform float   uKa, uKd, uKs;		// coefficients of each type of lighting
uniform float   uShininess;		// specular exponent

in  vec2  vST;			// texture coords
in  vec3  vN;			// normal vector
in  vec3  vL;			// vector from point to light
in  vec3  vE;			// vector from point to eye

const float EYES		= 0.91;				// correct!
const float EYET		= 0.65;				// correct!
const float R 			= 0.03;				// radius of salmon eye
const vec3 EYECOLOR		= vec3( 0.98, 0.50, 0.45 );	// "salmon" (r,g,b) color
const vec3 SALMONCOLOR		= vec3( 0.2745, 0.6098, 0.7059 );		// color to make the eye
const vec3 SPECULARCOLOR 	= vec3( 1., 1., 1. );

void
main( )
{
	vec3 myColor = SALMONCOLOR;
	float ds = EYES - vST.s;			// distance from vST.s (current frag s coord) to center of salmon eye s coord
	float dt = EYET - vST.t;			// distance from vST.t (current frag t coord) to center of salmon eye t coord

	// identifies distance with euclidean to allow for circular range
	if( ( R * R ) > ( (ds*ds) + (dt*dt) ) )
	{
			myColor = EYECOLOR;
	}


	// now do the per-fragment lighting:

	vec3 Normal    = normalize(vN);
	vec3 Light     = normalize(vL);
	vec3 Eye       = normalize(vE);

	vec3 ambient = uKa * myColor;

	float d = max( dot(Normal,Light), 0. );       // only do diffuse if the light can see the point
	vec3 diffuse = uKd * d * myColor;

	float s = 0.;
	if( d > 0. )	          // only do specular if the light can see the point
	{
		vec3 ref = normalize(  reflect( -Light, Normal )  );
		float cosphi = dot( Eye, ref );
		if( cosphi > 0. )
			s = pow( max( cosphi, 0. ), uShininess );
	}
	vec3 specular = uKs * s * SPECULARCOLOR.rgb;
	gl_FragColor = vec4( ambient + diffuse + specular,  1. );
}
