/**
 * Created by Akyan on 29/03/2015.
 */

module.exports.isValidRegion = function(region)
{
  switch(region)
  {
    case 'euw':
      return true;
    default:
      return false;
  }
}