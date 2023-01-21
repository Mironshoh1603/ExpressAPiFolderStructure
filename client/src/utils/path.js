/**
 * Individual file extractor, needs to create by your own.
 * @version 1.2.2
 * 
 * @param {*} location - main location, where the import needs to get file from
 * @param {*} defaultPath - Parent Directory. Or root folder. Even can go up as cd .., cd ../../
 * @returns returns the merged file location as a string type
 */
export default function path(location, defaultPath='pages') {
    return `./${defaultPath}/${location}`;
}